from django.contrib import admin
from django.urls import path
from django.http import JsonResponse, HttpResponse

def health(_request):
    return JsonResponse({"status": "ok"})

def home(_request):
    return HttpResponse("Django backend is running")

urlpatterns = [
    path('', home),  # /
    path('admin/', admin.site.urls),
    path('api/health/', health),
    # path('api/auth/', include('apps.authentication.urls')),
    # path('api/signals/', include('apps.signal_processing.urls')),
]