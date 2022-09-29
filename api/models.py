from cProfile import label
from unicodedata import name
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
class Base(models.Model):
    name=models.CharField(max_length=150)
    brand=models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Topping(models.Model):
    name=models.CharField(max_length=150)
    description=models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Aggregate(models.Model):
    name=models.CharField(max_length=150)
    description=models.CharField(max_length=500, blank=True, null=True)
    brand=models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Roll(models.Model):
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    topping = models.ManyToManyField(Topping)
    aggregate = models.ForeignKey(Aggregate, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Falta agregar restricciones
    # aggregate solo se puede agregar cuando hay 1 topping
    # pueden haber 2 topping pero 0 agregado

    def clean(self):
        toppings = self.cleaned_data.get('topping')
        aggregate = self.cleaned_data.get('aggregate')
        if toppings and toppings.count() > 2:
            raise ValidationError('Máximo de 2 topping')

        return self.cleaned_data

    def name(self):
        if self.aggregate.count() > 0:
            return "Full"
        elif self.topping.count() > 0:
            return "Bañado"
        else:
            return "Clasico"

    def __str__(self):
        return name()
