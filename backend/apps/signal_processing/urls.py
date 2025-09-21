from django.urls import path 
from .views import SignalListView, ProcessSignalView

urlpatterns = [
    path('', SignalListView.as_view(), name='signal-list'),
    path('process/', ProcessSignalView.as_view(), name='signal-process'),
]