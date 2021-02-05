from django.urls import path
from .views import BlogListView, BlogDetailView
from . import views

urlpatterns = [
    path('', BlogListView.as_view()),
    path('create',views.create),
    path('read/<slug>', BlogDetailView.as_view()),
    path('delete/<slug>', views.delete_blog),
    path('comment/', views.create_comment),
]