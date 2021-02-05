from rest_framework import serializers
from .models import Blog,BlogComment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
     class Meta:
         model = User
         fields = ('username')

class BlogListSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.CharField(source='uploaded_by.username', read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'small_description',
            'date_created',
            'slug',
            'uploaded_by'
        ]
        lookup_field = 'slug'

class BlogDetailSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.CharField(source='uploaded_by.username', read_only=True)
    class Meta:
        model = Blog
        exclude = ['id']
        lookup_field = 'slug'

class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'title',
            'small_description',
            'content'
        ]
        lookup_field = 'slug'

class BlogCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogComment
        fields = ['content']

class BlogCommentSerializer(serializers.Serializer):
    content = serializers.CharField()
    author = serializers.SerializerMethodField('get_author_name')
    date_created = serializers.DateTimeField()
    def get_author_name(self, obj):
        if obj.get("author_id"):
            author_obj = User.objects.filter(id=obj.get("author_id")).first()
            if author_obj:
                return author_obj.username
        return None