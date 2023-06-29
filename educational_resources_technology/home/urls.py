from django.urls import path
from django.contrib import admin

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("admin", admin.site.urls),
    path("support", views.support, name="support"),
    path("<path:url>", views.track_link_click, name="track_link_click"),
]
