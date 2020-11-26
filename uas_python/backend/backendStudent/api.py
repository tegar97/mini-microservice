from backendStudent.models import BackendStudent
from rest_framework import viewsets,permissions
from .serializers import StudentSerializer


# Student Viewset
class StudentViewSet(viewsets.ModelViewSet) :
    queryset = BackendStudent.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StudentSerializer