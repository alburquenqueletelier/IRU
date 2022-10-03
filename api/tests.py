from django.test import TestCase

# Create your tests here.
from .models import *

class ModelsTestCase(TestCase):
    fixtures = ['setup.json']

    def setUp(self):
        # Rolls
        classic = Roll.objects.create(
            base = Base.objects.filter(name="Harina de Trigo").first(),
            name = "Roll Clasico",
            description = "Roll clasico relleno de canela y azucar rubia",
            price = 1790
        )

        classic_topping_manjar = Roll.objects.create(
            base = Base.objects.filter(name="Harina de Trigo").first(),
            name = "Roll Bañado",
            description = "Roll bañado con manjar relleno de canela y azucar rubia",
            price = 1890
        )

        classic_topping_manjar.save()
        classic_topping_manjar.topping.add(Topping.objects.filter(name="Manjar").first())

        classic_frosty_oreo = Roll.objects.create(
            base = Base.objects.filter(name="Harina de Trigo").first(),
            aggregate = Aggregate.objects.filter(name="Oreo").first(),
            name = "Roll Full Frosting y Oreo",
            description = "Roll bañado con frosting con agregado de oreo, relleno de canela y azucar rubia",
            price = 1990
        )

        classic_frosty_oreo.save()
        classic_frosty_oreo.topping.add(Topping.objects.filter(name="Manjar").first())
        classic.save()

        # Offers
        classic_20desc = Offer.objects.create(
            name = "20 porci descuento Roll clasico",
            roll = classic
        )

        classic_20desc.save()

        # Carousel
        img1 = Carousel.objects.create(
            rolls_images = classic
        )

        img2 = Carousel.objects.create(
            offers = classic_20desc
        )

        img1.save()
        img2.save()

    def test_carousel(self):
        carousel1 = Carousel.objects.first()
        carousel2 = Carousel.objects.get(pk=2)
        self.assertIsNotNone(carousel1)
        self.assertIsNotNone(carousel2)
    
    def test_offer(self):
        offer = Offer.objects.first()
        self.assertIsNotNone(offer)