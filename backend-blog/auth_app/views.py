from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    username_config =  openapi.Parameter('username', openapi.IN_QUERY, description="username for user", type=openapi.TYPE_STRING)
    password_config = openapi.Parameter('password', openapi.IN_QUERY, description="password", type=openapi.TYPE_STRING)
    password2_config = openapi.Parameter('password2', openapi.IN_QUERY, description="reenter password", type=openapi.TYPE_STRING)
    @swagger_auto_schema(manual_parameters=[username_config,password_config,password2_config])
    def post(self,request):
        username = request.data['username']
        password = request.data['password']
        password2 = request.data['password2']

        if User.objects.filter(username=username).exists():
            return Response({
                'error': "Username already exists"
            })

        elif password != password2:
            return Response({
                'error': "Passwords don't match"
            })

        elif len(password) < 8:
            return Response({
                'error': 'Password should be 8 characters or more'
            })

        else:
            user = User.objects.create_user(username=username,password = password)
            return Response({
                'success': 'Account created sucessfully'
            })

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    username_config =  openapi.Parameter('username', openapi.IN_QUERY, description="username for user", type=openapi.TYPE_STRING)
    password_config = openapi.Parameter('password', openapi.IN_QUERY, description="password", type=openapi.TYPE_STRING)
    @swagger_auto_schema(manual_parameters=[username_config,password_config])
    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return Response({ 
                    'success': 'User authenticated' 
                })
            else:
                return Response({ 
                    'error': 'Error Authenticating' 
                })
        except:
            return Response({ 
                'error': 'Something went wrong when logging in' 
            })


class LogoutView(APIView):
    def post(self,request):
        auth.logout(request)
        return Response({
            'success':'Logged Out'
        })

class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        isAuthenticated = user.is_authenticated
        if isAuthenticated:
            return Response({ 
                'isAuthenticated': 'success','username':user.username 
            })
        else:
            return Response({ 
                'isAuthenticated': 'error' 
            })

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        return Response({ 
            'success': 'CSRF cookie set' 
        })