from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User

class Blog(models.Model):
    uploaded_by = models.ForeignKey(User, on_delete= models.CASCADE,related_name='blog')
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    small_description = models.CharField(max_length=100)
    content = models.TextField()
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = Blog.objects.all().filter(slug__iexact=original_slug).count()
        count = 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Blog.objects.all().filter(slug__iexact=slug).count()
        self.slug = slug
        super(Blog, self).save(*args, **kwargs)

    def __str__(self):
        return self.title[:15] + ', ' + self.slug

class BlogComment(models.Model):
    main_blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User,related_name='user', on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return str(self.author) + ', ' + str(self.main_blog.slug)