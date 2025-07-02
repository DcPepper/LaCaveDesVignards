from django.db import models

from cave_backend.models.purchase import Item

class Chocolat(Item):
    color = models.CharField(max_length=10)
    