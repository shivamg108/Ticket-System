from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tickets', views.TicketViewset, basename='ticket')

urlpatterns = [
    path('create/ticket/', views.TicketViewset.as_view({'post': 'create'}), name='create_ticket'),
    path('update/ticket/<int:pk>/', views.TicketViewset.as_view({'put': 'update'}), name='update_ticket'),
    path('delete/ticket/<int:pk>/', views.TicketViewset.as_view({'delete': 'destroy'}), name='delete_ticket'),
    path('list/ticket/', views.TicketViewset.as_view({'get': 'list'}), name='list_ticket'),
]   