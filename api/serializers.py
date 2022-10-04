# import serializers from the REST framework
from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
 
# import all data model
from .models import *
 
# create a serializer class

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_superuser')
        # fields = '__all__'

class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Base
        fields = ('id', 'name', 'brand')
        
class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('id', 'name', 'description')

class AggregateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aggregate
        fields = ('id', 'name', 'brand', 'description')

class RollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roll
        fields = ('id', 'name', 'description', 'price', 'image', 'base', 'topping', 'aggregate')

class RollNumComboSerializer(serializers.ModelSerializer):
    class Meta:
        model = RollNumCombo
        fields = ('id', 'roll', 'amount')

class ComboSerializer(serializers.ModelSerializer):
    class Meta:
        model = Combo
        fields = ('id', 'name', 'total_rolls', 'roll_amount', 'description', 'price')

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('id', 'name', 'combo', 'roll', 'discount', 'created_at')

class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = '__all__'

class TestimageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimage
        fields = '__all__'