from django.shortcuts import render

# Create your views here.
from . import views

from home.models import Resource


def index(request):
    resources = Resource.objects.all()
    for resource in resources:
        resource.image_src = resource.image.path.replace('/educational_resources_technology/', '').replace('home/static','')
        
    data = {"resources": resources}
    return render(request, 'index.html', data)

def about(request):
    return render(request, 'about.html')

def support(request):
    return render(request, 'support.html')