from urllib import request
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User, Permission, Group
from django.shortcuts import get_object_or_404

 
# import view sets from the REST framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import DjangoModelPermissions, AllowAny 
 
# import the TodoSerializer from the serializer file
from .serializers import *
 
# import the Todo model from the models file
from .models import *
from api import serializers


class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (DjangoModelPermissions, )

class BaseViewSet(viewsets.ModelViewSet):

    queryset = Base.objects.all()
    serializer_class = BaseSerializer
    
class ToppingViewSet(viewsets.ModelViewSet):

    queryset = Topping.objects.all()
    serializer_class = ToppingSerializer
    
class AggregateViewSet(viewsets.ModelViewSet):

    queryset = Aggregate.objects.all()
    serializer_class = AggregateSerializer

class RollViewSet(viewsets.ModelViewSet):

    queryset = Roll.objects.all()
    serializer_class = RollSerializer

class RollNumComboViewSet(viewsets.ModelViewSet):

    queryset = RollNumCombo.objects.all()
    serializer_class = RollNumComboSerializer

class ComboViewSet(viewsets.ModelViewSet):

    queryset = Combo.objects.all()
    serializer_class = ComboSerializer

class OfferViewSet(viewsets.ModelViewSet):

    queryset = Offer.objects.all()
    serializer_class = ComboSerializer

class CarouselViewSet(viewsets.ModelViewSet):

    queryset = Carousel.objects.all()
    serializer_class = ComboSerializer

class TestimageViewSet(viewsets.ModelViewSet):
    queryset = Testimage.objects.all()
    serializer_class = TestimageSerializer