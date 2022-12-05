from email.policy import default
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.html import mark_safe
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.core.mail import send_mail

from .managers import UserManager

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

def phone_validate(value):
    if len(value) != 9:
        raise ValidationError(
            f"Número telefónico debe tener 9 dígitos"
        )
    try:
        int(value, 10)
    except ValueError:
        raise ValidationError(
            f"Número invalido, no debe contener simbolos ni letras"
        )

# Create your models here.
#### Models related to Users ####
class Address(models.Model):
    street = models.CharField(max_length=300)

    def __str__(self):
        return self.street

class User(AbstractBaseUser):
    email = models.EmailField(max_length=150, unique=True)
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=9, validators=[phone_validate], default='999999999', unique=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    addresses = models.ManyToManyField(Address)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    objects = UserManager()

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    def __str__(self):
        return self.email

    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.name, self.lastname)
        return full_name.strip()

    def get_short_name(self):
        '''
        Returns the short name for the user.
        '''
        return self.name

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)

#### Models related to products ####
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
    name = models.CharField(max_length=200, default="ROLL")
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
        # return f"ID: {self.id} "
        return f"ID: {self.id} Producto: {self.rolls_images.name if self.rolls_images else self.combo_images.name}"

class Testimage(models.Model):
    imagen = models.ImageField(upload_to='rolls', blank=True)