# from urllib import request
from ast import Add
import email
import json
import os
import requests as req
# from lib2to3.pgen2 import token
# from django.shortcuts import render
from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User #, Permission, Group
# from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

 
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

@csrf_exempt
def register_validate(request):
    if request.method != 'POST':
        return JsonResponse({"error": "method not allowed"}, status=400)
    json_data = json.loads(request.body)
    token = json_data.get('token')
    data = json_data.get('data')
    secret = os.environ.get('REACT_APP_SECRET_KEY')
    # if the request status == 200 is human, else is a bot. 
    res = req.post(f'https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={token}`')
    # print(res.status_code)
    # return JsonResponse(res, safe=False)
    if res.status_code == 200:
        # print(
        #     f"name: {data.get('name')}\n lastname: {data.get('lastname')}\n email: {data.get('email')}\n phone: {data.get('phone')}\n address: {data.get('address')}\n password: {data.get('password')}"
        # )
        # return JsonResponse({"response":"Human 👨 👩"}, status=200) 
        try:
            new_user = User.objects.create(
                name=data.get('name'), 
                email=data.get('email'), 
                phone=data.get('phone'),
                lastname=data.get('lastname') if 'lastname' in data else None, 
                password=data.get('password')
            )
            new_user.save()
            if data.get('address'):
                address = Address(street=data.get('address'))
                address.save()
                new_user.addresses.add(address)
            return JsonResponse({"response":"Cuenta creada con éxito"}, status=200)
        except:
            return JsonResponse({"response": "Algo salió mal con el registro, intentalo más tarde"}, 500)
    else:
        return JsonResponse({"response":"Robot 🤖"}, status=406)

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
    serializer_class = OfferSerializer

class CarouselViewSet(viewsets.ModelViewSet):

    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer

class TestimageViewSet(viewsets.ModelViewSet):
    queryset = Testimage.objects.all()
    serializer_class = TestimageSerializer