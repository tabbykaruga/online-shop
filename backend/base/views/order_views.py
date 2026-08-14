from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import OrderSerializer
from rest_framework import status


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    order_items = data["orderItems"]
    if order_items and len(order_items) == 0:
        return Response(
            {"error": "No Order Item to process"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )

        # create shipping address
        ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # create order items and relatationship to order
        for i in order_items:
            product = Product.objects.get(_id=i["product"])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url,
            )
            # update the count in stock by reducing based on qty
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response(
                {"error": "Not Authorized to view order"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except Exception:
        return Response(
            {"error": "Order does not exist"},
            status=status.HTTP_400_BAD_REQUEST,
        )
