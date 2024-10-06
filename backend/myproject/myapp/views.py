from rest_framework import viewsets
from .models import *
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.db.models import Sum, F
from rest_framework.response import Response
from rest_framework.decorators import api_view

class BetailViewSet(viewsets.ModelViewSet):
    queryset = Betail.objects.all()
    serializer_class = BetailSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Betail.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Employee.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class AlimentationViewSet(viewsets.ModelViewSet):
    queryset = Alimentation.objects.all()
    serializer_class = AlimentationSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Alimentation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MedecineViewSet(viewsets.ModelViewSet):
    queryset = Medecine.objects.all()
    serializer_class = MedecineSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Medecine.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class MedicamentViewSet(viewsets.ModelViewSet):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Medicament.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MaterielViewSet(viewsets.ModelViewSet):
    queryset = Materiel.objects.all()
    serializer_class = MaterielSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Materiel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class ProductionViewSet(viewsets.ModelViewSet):
    queryset = Production.objects.all()
    serializer_class = ProductionSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Production.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CalendrierViewSet(viewsets.ModelViewSet):
    queryset = Calendrier.objects.all()
    serializer_class = CalendrierSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return Calendrier.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_201_CREATED)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

@api_view(['GET'])
def financial_summary(request):
    # Extracting the year and month from query params
    year = request.query_params.get('year')
    month = request.query_params.get('month')
    
    # Initialize querysets
    alimentations = Alimentation.objects.filter(user=request.user, date__year=year)
    medecines = Medecine.objects.filter(user=request.user, date__year=year)
    materiels = Materiel.objects.filter(user=request.user, date__year=year)
    productions = Production.objects.filter(user=request.user, date__year=year)
    employees = Employee.objects.filter(user=request.user)

    if month:
        alimentations = alimentations.filter(date__month=month)
        medecines = medecines.filter(date__month=month)
        materiels = materiels.filter(date__month=month)
        productions = productions.filter(date__month=month)
    
    alimentation_expense = alimentations.aggregate(total=Sum(F('prix') * F('poid')))['total'] or 0
    medecine_expense = medecines.aggregate(total=Sum('prix'))['total'] or 0
    materiel_expense = materiels.aggregate(total=Sum(F('prix') * F('nombre')))['total'] or 0
    employee_expense = employees.aggregate(total=Sum('salaire'))['total'] or 0
    production_revenue = productions.aggregate(total=Sum(F('prix') * F('quantite')))['total'] or 0

    # Calculating total expenses
    total_expenses = (
        (alimentation_expense ) +
        (medecine_expense ) +
        (materiel_expense ) +
        (employee_expense)
    )

    # Calculating total revenue
    total_revenue = production_revenue 
    
    alimentations_data = list(alimentations.values('id', 'prix', 'poid'))
    materiels_data = list(materiels.values('id', 'prix', 'nombre'))
    medecines_data = list(medecines.values('id', 'prix'))
    employees_data = list(employees.values('id', 'salaire'))
    productions_data = list(productions.values('id', 'prix', 'quantite'))

    data = {
        'year': int(year),
        'month': int(month) if month else None,
        'alimentations': alimentations_data,
        'materiels': materiels_data,
        'medecines': medecines_data,
        'employees': employees_data,
        'productions': productions_data, 
        'production_revenue': production_revenue,
        'materiel_expense': materiel_expense,
        'medecine_expense': medecine_expense,
        'alimentation_expense': alimentation_expense,
        'employee_expense': employee_expense,
        'total_expenses': total_expenses,
        'total_revenue': total_revenue,
    }

    return Response(data)

@api_view(['GET'])
def count_summary(request):
    
    employeeCount = Employee.objects.filter(user=request.user).count()
    betailCount = Betail.objects.filter(user=request.user).count()
    betailMaleCount = Betail.objects.filter(user=request.user, sexe='male').count()
    betailFemelleCount = Betail.objects.filter(user=request.user, sexe='femelle').count()
    
    data = {
        'employeeCount': employeeCount,
        'betailCount': betailCount,
        'betailMaleCount': betailMaleCount,
        'betailFemelleCount': betailFemelleCount,
    }
    
    return Response(data)

@api_view(['GET'])
def get_medicament(request):
    
    tag = request.query_params.get('tag')
    
    medicament = list(Medicament.objects.filter(user=request.user).values('id', 'tag','raison', 'medicament', 'dosage', 'description', 'date'))
    
    return Response(medicament)
