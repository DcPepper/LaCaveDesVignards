from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    stock = models.IntegerField()
    quantity = models.IntegerField()
    photos = models.CharField(max_length=100)
    pourcentage = models.IntegerField()
    selection = models.BooleanField(default=False)
    
class ChartItem(models.Model):
    item = models.ForeignKey(to=Item, on_delete=models.CASCADE)
    chart = models.ForeignKey('Chart', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    pk = models.CompositePrimaryKey("item_id", "chart_id")

class Chart(models.Model):
    code = models.CharField(max_length=32, primary_key=True)
    date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)