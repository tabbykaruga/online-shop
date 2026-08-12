from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import OrderSerializer
from rest_framework import status


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]
    if orderItems and len(orderItems) == 0:
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
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # create order items and relatationship to order
        for i in orderItems:
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
