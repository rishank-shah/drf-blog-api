from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.contrib import admin
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Blog API",
      default_version='v1',
      description="Blog api with create,delete blog and comment on blog",
      terms_of_service="",
      contact=openapi.Contact(email="shahrishank@gmail.com"),
      license=openapi.License(name="Test License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/blog/',include('blog.urls')),
    path('api/auth/',include('auth_app.urls')),
    path('api/admin/', admin.site.urls),
]

urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name = 'index.html'))]