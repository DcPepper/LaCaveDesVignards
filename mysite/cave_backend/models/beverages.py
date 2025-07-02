from django.db import models

from cave_backend.models.purchase import Item


class Vine(Item):
    couleur = models.CharField(max_length=20)
    origin = models.CharField(max_length=20)
    year = models.IntegerField()
    variety = models.CharField(max_length=100)

class Biere(Item):
    variety = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)

class Spirits(Item):
    variety = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)





# Create your models here.
