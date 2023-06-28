from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.http import Http404

# Create your views here.
from . import views
from .models import LinkClick

from home.models import Resource


def index(request):
    resources = Resource.objects.all()
    for resource in resources:
        resource.image_src = resource.image.path.replace(
            "/educational_resources_technology/", ""
        ).replace("home/static", "")

    data = {"resources": resources}
    return render(request, "index.html", data)


def about(request):
    return render(request, "about.html")


def support(request):
    return render(request, "support.html")


def track_link_click(request, url):
    url = url.rstrip("/")
    print(url)
    if ":" not in url:
        try:
            return redirect(url)
        except:
            raise Http404("URL does not exist")
    else:
        link, created = LinkClick.objects.get_or_create(url=url)
        link.click_count += 1
        link.save()

        return HttpResponseRedirect(url)
