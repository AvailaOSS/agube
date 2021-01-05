from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

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
    path(r'token/auth', obtain_jwt_token),
    path(r'token/refresh', refresh_jwt_token),
]

if settings.DEBUG:
    urlpatterns.append(path('admin/', admin.site.urls))
    urlpatterns.append(
        url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json')),
    urlpatterns.append(url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')),
