from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'betails', BetailViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', CustomAuthToken.as_view()),
    path('register', RegisterView.as_view()),
    path('user', UserView.as_view()),
]