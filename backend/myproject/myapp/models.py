from django.db import models

# Create your models here.

class Betail(models.Model):
    CHOIX_SEXE = (
        ("MALE", "male"),
        ("FEMELLE", "femelle"),
    )
    race = models.CharField(max_length=100)
    nom = models.CharField(max_length=50)
    sexe = models.CharField(
        max_length=10,
        choices=CHOIX_SEXE,
    )
    date_naissance = models.DateField()
    date_entre_farm = models.DateField()
    mere = models.IntegerField()
    pere = models.IntegerField()
