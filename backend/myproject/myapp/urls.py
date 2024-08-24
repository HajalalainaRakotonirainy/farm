from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BetailViewSet

router = DefaultRouter()
router.register(r'betails', BetailViewSet)

urlpatterns = [
    path('', include(router.urls)),
]