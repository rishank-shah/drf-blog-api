from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.contrib import admin

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/blog/',include('blog.urls')),
    path('api/auth/',include('auth_app.urls')),
    path('api/admin/', admin.site.urls),
]

urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name = 'index.html'))]