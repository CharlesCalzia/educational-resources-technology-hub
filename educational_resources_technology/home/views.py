from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, Http404
from urllib.parse import urlparse

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
    if url is None:
        raise Http404("Invalid URL")

    def is_external_url(request, url):
        current_domain = request.get_host()
        parsed_url = urlparse(url)
        if parsed_url.netloc == "":
            return False
        return parsed_url.netloc != current_domain

    url = url.rstrip("/")

    link, created = LinkClick.objects.get_or_create(url=url)
    link.click_count += 1
    link.save()

    if is_external_url(request, url):
        return HttpResponseRedirect(url)
    else:
        raise Http404("Not recognized URL")
