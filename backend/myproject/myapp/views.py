from rest_framework import viewsets
from .models import Betail
from .serializers import BetailSerializer

class BetailViewSet(viewsets.ModelViewSet):
    queryset = Betail.objects.all()
    serializer_class = BetailSerializer
