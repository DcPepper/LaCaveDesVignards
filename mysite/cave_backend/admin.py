from django.contrib import admin
from cave_backend.models.beverages import Vine, Biere, Spirits
from cave_backend.models.food import Chocolat

admin.site.register(Biere)
admin.site.register(Spirits)
admin.site.register(Chocolat)

from django.contrib import admin


class VineAdmin(admin.ModelAdmin):
    list_display = ["name", "year", "couleur", "stock", "selection"]
    list_filter = ["year", "couleur", "stock", "selection"]

admin.site.register(Vine, VineAdmin)