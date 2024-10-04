from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'betails', BetailViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'alimentations', AlimentationViewSet)
router.register(r'medecines', MedecineViewSet)
router.register(r'medicaments', MedicamentViewSet)
router.register(r'materiels', MaterielViewSet)
router.register(r'productions', ProductionViewSet)
router.register(r'calendriers', CalendrierViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login', CustomAuthToken.as_view()),
    path('register', RegisterView.as_view()),
    path('user', UserView.as_view()),
    path('financial-summary/', financial_summary),
    path('count-summary/', count_summary),
]