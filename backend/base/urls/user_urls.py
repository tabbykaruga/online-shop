from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path("", views.get_users, name="users"),
    path(
        "login/",
        views.MyTokenPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("register/", views.register_user, name="register"),
    path("profile/", views.get_user_profile, name="user-profile"),
    path("profile/update/", views.update_user_profile, name="user-profile-update"),
]
