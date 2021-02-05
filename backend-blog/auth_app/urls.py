from django.urls import path
from .views import SignupView,GetCSRFToken,LoginView,LogoutView,CheckAuthenticatedView

urlpatterns = [
    path('register',SignupView.as_view()),
    path('isauthenticated',CheckAuthenticatedView.as_view()),
    path('logout',LogoutView.as_view()),
    path('login',LoginView.as_view()),
    path('get_csrf_token/',GetCSRFToken.as_view())
]
