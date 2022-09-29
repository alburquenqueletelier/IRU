# import serializers from the REST framework
from dataclasses import field
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
        fields = ('id', 'base', 'topping', 'aggregate')