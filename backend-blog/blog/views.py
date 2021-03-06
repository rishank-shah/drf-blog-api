from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blog.models import Blog,BlogComment
from blog.serializers import BlogDetailSerializer,BlogListSerializer,BlogCreateSerializer,BlogCommentSerializer,BlogCommentCreateSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class BlogListView(ListAPIView):
    queryset = Blog.objects.order_by('-date_created')
    serializer_class = BlogListSerializer
    lookup_field = 'slug'

class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.order_by('-date_created')
    serializer_class = BlogDetailSerializer
    lookup_field = 'slug'
    def get(self, request, slug):
        if Blog.objects.filter(slug=slug).exists():
            post = Blog.objects.get(slug=slug)
            comments_count = BlogComment.objects.filter(main_blog = post).count()
            if comments_count > 0:
                comments = BlogComment.objects.filter(main_blog = post).values()
                serialized_data = BlogCommentSerializer(comments,many=True)
                ser = serialized_data.data
            else:
                ser = {}
            serializer = BlogDetailSerializer(post)
            return Response({
                'blog': serializer.data,
                'comments_count': comments_count,
                'comments':ser
            })
        else:
            return Response({
                "error":"Not Found"
            })

content_config =  openapi.Parameter('content', openapi.IN_QUERY, description="content for blog", type=openapi.TYPE_STRING)
title_config = openapi.Parameter('title', openapi.IN_QUERY, description="title for blog", type=openapi.TYPE_STRING)
small_description_config = openapi.Parameter('small_description', openapi.IN_QUERY, description="small description for blog", type=openapi.TYPE_STRING)
@swagger_auto_schema(method='post', manual_parameters=[title_config,small_description_config,content_config])
@api_view(['POST'])
def create(request):
    serializer = BlogCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(uploaded_by=request.user)
    return Response({
        'success':'Blog Created Successfully'
    })

@api_view(['DELETE'])
def delete_blog(request,slug):
    user = User.objects.get(username = request.user.username)
    if Blog.objects.filter(uploaded_by = user,slug__iexact=slug).exists():
        Blog.objects.get(uploaded_by = user,slug__iexact=slug).delete()
        return Response({
            'success':'Deleted Blog Successfully'
        })
    else:
        return Response({
            'error':'You cannot delete this blog'
        })

comment_content_config =  openapi.Parameter('content', openapi.IN_QUERY, description="content for comment", type=openapi.TYPE_STRING)
@swagger_auto_schema(method='post',manual_parameters=[comment_content_config])
@api_view(['POST'])
def create_comment(request):
    user = User.objects.get(username = request.user.username)
    slug = request.data['slug']
    if Blog.objects.filter(slug__iexact=slug).exists():
        blog = Blog.objects.get(slug__iexact=slug)
    serializer = BlogCommentCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(main_blog=blog,author=request.user)
    return Response({
        'success':'Comment Created Successfully'
    })