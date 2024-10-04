from django.contrib import admin
from .models import *

# Register your models here.
class BetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'tag', 'race', 'nom', 'sexe', 'date_naissance', 'date_entre_farm', 'pelage', 'poid', 'mere_tag', 'pere_tag')

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom','prenom', 'date_entre', 'poste', 'salaire')

class AlimentationAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom','poid', 'prix', 'date')

class MedecineAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom','types', 'prix', 'date')

class MedicamentAdmin(admin.ModelAdmin):
    list_display = ('id', 'tag','raison', 'medicament', 'dosage', 'description', 'date')

class MaterielAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom','nombre', 'prix', 'date')

class ProductionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom','quantite', 'prix', 'date')

class CalendrierAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'start', 'end', 'allday')

admin.site.register(Betail, BetailAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Alimentation, AlimentationAdmin)
admin.site.register(Medecine, MedecineAdmin)
admin.site.register(Medicament, MedicamentAdmin)
admin.site.register(Materiel, MaterielAdmin)
admin.site.register(Production, ProductionAdmin)
admin.site.register(Calendrier, CalendrierAdmin)


