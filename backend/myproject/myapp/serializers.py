from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class BetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Betail
        fields = ['id', 'tag', 'race', 'nom', 'sexe', 'date_naissance', 'date_entre_farm', 'pelage', 'poid', 'mere_tag', 'pere_tag']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'nom','prenom', 'date_entre', 'poste', 'salaire']
      
class AlimentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimentation
        fields = ['id', 'nom','poid', 'prix', 'date']

class MedecineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecine
        fields = ['id', 'nom','types', 'prix', 'date']

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = ['id', 'tag','raison', 'medicament', 'dosage', 'description', 'date']
        
class MaterielSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materiel
        fields = ['id', 'nom','nombre', 'prix', 'date']

class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ['id', 'nom','quantite', 'prix', 'date']

class CalendrierSerializer(serializers.ModelSerializer):
    
    # start = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S+03:00")
    # end = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S+03:00")
    class Meta:
        model = Calendrier
        fields = ['id', 'title', 'start', 'end', 'allday']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email')
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class FinancialSummarySerializer(serializers.Serializer):
    year = serializers.IntegerField()
    month = serializers.IntegerField(required=False)
    total_expenses = serializers.DecimalField(max_digits=1000, decimal_places=2)
    total_revenue = serializers.DecimalField(max_digits=1000, decimal_places=2)