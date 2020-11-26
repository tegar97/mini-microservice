from rest_framework import serializers
from backendStudent.models import BackendStudent

class StudentSerializer(serializers.ModelSerializer):
    class Meta :
        model = BackendStudent 
        fields = '__all__'
