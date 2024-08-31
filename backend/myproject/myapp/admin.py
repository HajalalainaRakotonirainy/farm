from django.contrib import admin
from .models import *

# Register your models here.
class BetailAdmin(admin.ModelAdmin):
    list_display = ('nom', 'race', 'sexe', 'date_naissance')
    pass

admin.site.register(Betail, BetailAdmin)


