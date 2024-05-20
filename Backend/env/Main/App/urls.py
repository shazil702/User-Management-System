from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.MyTokenView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("dashboard/",views.dashboard),
    path("dashboard/<int:id>/",views.dashboard),
    path("admintoken/",views.SuperuserToken.as_view()),
    path("",views.getRoutes),
    path("search/",views.search),
]