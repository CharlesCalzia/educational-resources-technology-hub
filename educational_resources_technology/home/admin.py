from admin_extra_buttons.api import ExtraButtonsMixin, button, confirm_action, link, view
from admin_extra_buttons.utils import HttpResponseRedirectToReferrer
from django.http import HttpResponse, JsonResponse
from django.contrib import admin
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.views.decorators.csrf import csrf_exempt
from .models import Resource, Wifi
from django.contrib import messages
import os

@admin.action(description="Connect to Wifi network")
def connect(self, request, queryset):
    if len(queryset) > 1:
        messages.error(request, "You can only select one Wifi network")
        return HttpResponseRedirectToReferrer(request)
    interface = 'wlan0'
    name = queryset.first().name
    password = queryset.first().password

    os.system(f'iwconfig {interface} essid {name} key {password}')
    messages.success(request, f'Connected to {name} successfully')

class WifiAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    actions = [connect]

    """@button(html_attrs={'style': 'background-color:#88FF88;color:black'})
    def update(self, request):
        def _action(request):
            #wifi = Resource.objects.all()[0]
            #print(wifi)

            
            print(request)
            pass

        return confirm_action(self, request, _action, "Are you sure you want to update? Updates are typically around once each month.", "Successfully run updater", )"""


admin.site.register(Resource)
admin.site.register(Wifi, WifiAdmin)