from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSerializer
from rest_framework import status


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        user=user,
        name=data.get("name", ""),
        price=data.get("price", 0),
        brand=data.get("brand", ""),
        countInStock=data.get("countInStock", 0),
        category=data.get("category", ""),
        description=data.get("description", ""),
        image=request.FILES.get("image"),
    )
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data["name"]
    product.price = data["price"]
    product.brand = data["brand"]
    product.countInStock = data["countInStock"]
    product.category = data["category"]
    product.description = data["description"]
    if "image" in request.FILES:
        product.image = request.FILES["image"]

    product.save()

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response("Product Deleted Successfully")
