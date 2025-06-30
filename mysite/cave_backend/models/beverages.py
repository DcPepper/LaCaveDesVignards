from django.db import models

class Beverage(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    stock = models.IntegerField()
    quantity = models.IntegerField()
    photos = models.CharField(max_length=100)
    pourcentage = models.IntegerField()

class Vine(Beverage):
    couleur = models.CharField(max_length=20)
    origin = models.CharField(max_length=20)
    year = models.IntegerField()
    variety = models.CharField(max_length=100)

class Biere(Beverage):
    variety = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)

class Spirits(Beverage):
    variety = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)





# Create your models here.
