# import serializers from the REST framework
from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
 
# import all data model
from .models import *
 
# create a serializer class
class AddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Address
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    addresses = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='street'
    )
    class Meta:
        model = User
        exclude = ('is_admin', 'is_active', 'date_joined')
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
    base = serializers.SlugRelatedField(
        queryset=Base.objects.all(),
        slug_field='name'
    )
    topping = serializers.SlugRelatedField(
        many=True,
        queryset=Topping.objects.all(),
        slug_field='name'
    )
    aggregate = serializers.SlugRelatedField(
        queryset=Aggregate.objects.all(),
        slug_field='name',
        allow_null=True
    )
    class Meta:
        model = Roll
        fields = ('__all__')

class RollNumComboSerializer(serializers.ModelSerializer):
    roll = serializers.SlugRelatedField(
        queryset=Roll.objects.all(),
        slug_field='name'
    )
    class Meta:
        model = RollNumCombo
        fields = ('id', 'roll', 'amount')

class ComboSerializer(serializers.ModelSerializer):
    roll_amount = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=RollNumCombo.objects.all(),
        view_name='rollnumcombo-detail'
    )

    class Meta:
        model = Combo
        fields = ('__all__')

class OfferSerializer(serializers.ModelSerializer):
    combo = serializers.SlugRelatedField(
        queryset=Combo.objects.all(),
        slug_field='name'
    )
    roll = serializers.SlugRelatedField(
        queryset=Roll.objects.all(),
        slug_field='name'
    )
    class Meta:
        model = Offer
        fields = ('id', 'name', 'combo', 'roll', 'discount', 'created_at')

class CarouselSerializer(serializers.ModelSerializer):
    rolls_images = serializers.SlugRelatedField(
        queryset=Roll.objects.all(),
        slug_field='name'
    )
    combo_images = serializers.SlugRelatedField(
        queryset=Combo.objects.all(),
        slug_field='name'
    )
    class Meta:
        model = Carousel
        fields = '__all__'

class TestimageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimage
        fields = '__all__'