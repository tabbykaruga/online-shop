from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.models import Product, Review
from base.serializer import ProductSerializer
from rest_framework import status


# PRODUCT VIEWS
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


# REVIEW VIEWS
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )

    user = request.user
    data = request.data

    already_exist = product.review_set.filter(user=user).exists()
    if already_exist:
        return Response(
            {"error": "Product already reviewed"}, status=status.HTTP_400_BAD_REQUEST
        )

    rating = data.get("rating", 0)
    comment = data.get("comment", "")

    try:
        rating = int(rating)
    except (TypeError, ValueError):
        return Response({"error": "Invalid rating"}, status=status.HTTP_400_BAD_REQUEST)

    if rating < 1 or rating > 5:
        return Response(
            {"error": "Please select a rating between 1 and 5"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    Review.objects.create(
        user=user,
        product=product,
        name=user.first_name if user.first_name else user.email,
        rating=rating,
        comment=comment,
    )

    reviews = product.review_set.all()
    count = reviews.count()
    product.numReviews = reviews.count()
    product.rating = (sum(r.rating for r in reviews) / count) if count else 0
    product.save()

    return Response({"detail": "Review Added"}, status=status.HTTP_201_CREATED)
