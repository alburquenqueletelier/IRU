# import serializers from the REST framework
from rest_framework import serializers
 
# import all data model
from .models import *
 
# create a serializer class
class TodoSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Task
        fields = ('id', 'title','description','completed')