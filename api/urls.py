from unicodedata import name
from django.urls import path

from . import views
from .views import register_validate

urlpatterns = [
    ## API Routes ##
    # path("api/login", views.login, name="login"),
    # path('api/protegida', Protegida.as_view(), name='protegida'),
    path('register_validate', views.register_validate, name="register_validate"),
    path('login_token', views.login_token, name="login_token"),
]