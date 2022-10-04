from cProfile import label
from distutils.command.upload import upload
from email.policy import default
from pyexpat import model
from unicodedata import name
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.html import mark_safe
from django.core.validators import MaxValueValidator, MinValueValidator

# Business Vars
max_combo = 6

# Global Validators 
def min_price(value):
    if value < 300:
        raise ValidationError(
            'Valor mínimo debe ser mayor o igual a 300'
        )

def amount_validate(value):
    if value < 0 or value > max_combo:
        raise ValidationError(
            f'No puede ser negativo ni mayor a {max_combo}'
        )

# Create your models here.
class Base(models.Model):
    name=models.CharField(max_length=150)
    brand=models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

class Topping(models.Model):
    name=models.CharField(max_length=150)
    description=models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

class Aggregate(models.Model):
    name=models.CharField(max_length=150)
    description=models.CharField(max_length=500, blank=True, null=True)
    brand=models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


class Roll(models.Model):
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    topping = models.ManyToManyField(Topping, blank=True)
    aggregate = models.ForeignKey(Aggregate, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='rolls', blank=True)
    name = models.CharField(max_length=200, default="ROLL", blank=True)
    description = models.CharField(max_length=1000, default="IRU", blank=True)
    price = models.IntegerField(default=99999, validators=[min_price])
    sold = models.IntegerField(default=0)
    available = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    # Falta agregar restricciones
    # aggregate solo se puede agregar cuando hay 1 topping
    # pueden haber 2 topping pero 0 agregado

    # def clean(self):
    #     toppings = self.cleaned_data.get('topping')
    #     aggregate = self.cleaned_data.get('aggregate')
    #     if toppings and toppings.count() > 2:
    #         raise ValidationError('Máximo de 2 topping')

    #     return self.cleaned_data

    def set_name(self):
        if self.aggregate:
            toppings = self.topping.all()
            names = [topping.name for topping in toppings]
            return f"Full: {' + '.join(names)} con {self.aggregate.name}" 
        elif self.topping.count() > 0:
            return f"Bañado: {self.topping.name}"
        else:
            return "Clasico"

    def __str__(self):
        return self.name or self.set_name()

class RollNumCombo(models.Model):
    roll = models.ForeignKey(Roll, on_delete=models.CASCADE)
    amount = models.IntegerField(validators=[amount_validate])

    def __str__(self):
        return self.roll.set_name() + f" x{self.amount}"

class Combo(models.Model):
    name = models.CharField(max_length=150)
    total_rolls = models.IntegerField(validators=[amount_validate], default=1)
    description = models.CharField(max_length=1000, default="Combo IRU")
    image = models.ImageField(upload_to='rolls', blank=True)
    price = models.IntegerField(default=99999, validators=[min_price])
    sold = models.IntegerField(default=0)
    roll_amount = models.ManyToManyField(RollNumCombo)
    available = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

class Offer(models.Model):
    name = models.CharField(max_length=150)
    combo = models.OneToOneField(Combo, on_delete=models.CASCADE, blank=True, null=True)
    roll = models.OneToOneField(Roll, on_delete=models.CASCADE, blank=True, null=True)
    discount = models.IntegerField(default=1, validators=[
        MaxValueValidator(80),
        MinValueValidator(1)
    ])
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

class Carousel(models.Model):
    rolls_images = models.OneToOneField(Roll, on_delete=models.CASCADE, blank=True, null=True)
    combo_images = models.OneToOneField(Combo, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f"ID: {self.id} Foto: {self.rolls_images.name or self.combo_images.name}"

class Testimage(models.Model):
    imagen = models.ImageField(upload_to='rolls', blank=True)