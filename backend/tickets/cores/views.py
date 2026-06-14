from .models import Ticket
from .serializers import TicketSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Q

class TicketViewset(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = Ticket.objects.all().order_by('-created_at')
        status_param = self.request.query_params.get('status', None)
        if status_param:
            queryset = queryset.filter(status=status_param)
        search_param = self.request.query_params.get('search', None)
        if search_param:
            queryset = queryset.filter(
                Q(customer_email__icontains=search_param) |
                Q(title__icontains=search_param)
            )
        return queryset

    def create(self, request):
        data = request.data.copy()
        if not data.get('title'):
            data['title'] = f"{data.get('issue_category', 'General')} Ticket - {data.get('customer_name', 'Customer')}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        ticket = self.get_object()
        serializer = self.get_serializer(ticket, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        ticket = self.get_object()
        self.perform_destroy(ticket)
        return Response(status=status.HTTP_204_NO_CONTENT)
