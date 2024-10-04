from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Betail(models.Model):
    CHOIX_SEXE = (
        ("male", "Male"),
        ("femelle", "Femelle"),
    )
    tag = models.CharField(max_length=20)
    race = models.CharField(max_length=100)
    nom = models.CharField(max_length=50)
    sexe = models.CharField(
        max_length=10,
        choices=CHOIX_SEXE,
    )
    date_naissance = models.DateField()
    date_entre_farm = models.DateField()
    pelage = models.CharField(max_length=255)
    poid = models.DecimalField(max_digits=1000, decimal_places=2)
    mere_tag = models.CharField(max_length=20)
    pere_tag = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Employee(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_entre = models.DateField()
    poste = models.CharField(max_length=255)
    salaire = models.DecimalField(max_digits=1000, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Alimentation(models.Model):
    nom = models.CharField(max_length=255)
    poid = models.DecimalField(max_digits=1000, decimal_places=2)
    prix = models.DecimalField(max_digits=1000, decimal_places=2)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Medecine(models.Model):
    nom = models.CharField(max_length=255)
    types = models.CharField(max_length=255)
    prix = models.DecimalField(max_digits=1000, decimal_places=2)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Medicament(models.Model):
    CHOIX_RAISON = (
        ("vaccin", "Vaccin"),
        ("traitement", "Traitement"),
    )
    tag = models.CharField(max_length=20)
    raison = models.CharField(max_length=15, choices=CHOIX_RAISON)
    medicament = models.CharField(max_length=255)
    dosage = models.DecimalField(max_digits=1000, decimal_places=2)
    description = models.CharField(max_length=255)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Materiel(models.Model):
    nom = models.CharField(max_length=255)
    nombre = models.PositiveIntegerField()
    prix = models.DecimalField(max_digits=1000, decimal_places=2)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Production(models.Model):
    nom = models.CharField(max_length=255)
    quantite = models.DecimalField(max_digits=1000, decimal_places=2)
    prix = models.DecimalField(max_digits=1000, decimal_places=2)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Calendrier(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    allday = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)



