from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Base)
admin.site.register(Topping)
admin.site.register(Aggregate)
admin.site.register(Roll)