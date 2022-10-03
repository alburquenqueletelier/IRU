from django.contrib import admin
from .models import *
# Register your models here.

class SuppliesAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "brand"]

class ToppingAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]

class RollAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "price", "sold"]

class ComboAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "total_rolls", "price", "description", "sold"]

class OfferAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "combo", "roll", "discount"]

admin.site.register(Base, SuppliesAdmin)
admin.site.register(Topping, ToppingAdmin)
admin.site.register(Aggregate, SuppliesAdmin)
admin.site.register(Roll, RollAdmin)
admin.site.register(Combo, ComboAdmin)
admin.site.register(RollNumCombo)
admin.site.register(Offer, OfferAdmin)
admin.site.register(Carousel)
admin.site.register(Testimage)