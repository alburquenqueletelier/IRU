from unicodedata import name
from django.urls import path

from . import views
from .views import Protegida, TodoView

urlpatterns = [
    ## API Routes ##
    path("api/login", views.login, name="login"),
    path('api/protegida', Protegida.as_view(), name='protegida'),

]