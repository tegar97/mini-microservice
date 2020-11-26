from rest_framework import routers
from .api import StudentViewSet

routers = routers.DefaultRouter()
routers.register('api/student',StudentViewSet,'students')

urlpatterns = routers.urls