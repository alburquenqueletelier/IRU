from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
# import views from app
from api import views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'addresses', views.AddressViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'bases', views.BaseViewSet)
router.register(r'salsas', views.ToppingViewSet)
router.register(r'agregados', views.AggregateViewSet)
router.register(r'rolls', views.RollViewSet)
router.register(r'rolls_amount', views.RollNumComboViewSet)
router.register(r'combos', views.ComboViewSet)
router.register(r'offers', views.OfferViewSet)
router.register(r'carousels', views.CarouselViewSet)
router.register(r'test', views.TestimageViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include("api.urls")),
    path('api/', include(router.urls)),
    path('api/views/', include('api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
