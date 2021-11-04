from address.urls import urlpatterns as urls_address
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from dwelling.urls import urlpatterns as urls_dwelling
from login.urls import urlpatterns as urls_user
from manager.urls import urlpatterns as urls_manager
from phone.urls import urlpatterns as urls_phone
from reservoir.urls import urlpatterns as urls_reservoir
from rest_framework import permissions
from watermeter.urls import urlpatterns as urls_water_meter

current_version = 'v1'
module_name = 'agube'
base_url = 'api/' + current_version + '/' + module_name + '/'

schema_view = get_schema_view(
    openapi.Info(
        title="Agube API",
        default_version=current_version,
        description="Agube API REST definition",
        terms_of_service="https://choosealicense.com/no-permission/",
        contact=openapi.Contact(email="frannabril@gmail.com"),
        license=openapi.License(name="No License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(base_url + 'address', include(urls_address)),
    path(base_url + 'dwelling', include(urls_dwelling)),
    path(base_url + 'reservoir', include(urls_reservoir)),
    path(base_url + 'phone', include(urls_phone)),
    path(base_url + 'water-meter', include(urls_water_meter)),
    path(base_url + 'manager', include(urls_manager)),
    path(base_url + 'user', include(urls_user))
]

if settings.DEBUG:
    urlpatterns.append(path('admin/', admin.site.urls))
    urlpatterns.append(path('api-auth/', include('rest_framework.urls')))
    urlpatterns.append(
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'))
    urlpatterns.append(re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'))
    urlpatterns.append(path('', RedirectView.as_view(url='swagger', permanent=False), name='api-root'))
