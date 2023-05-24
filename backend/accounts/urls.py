from django.urls import include, path
from .views import ProdigiOrdersAPIView, RegisterView, VerifyEmailView,LoginView,check_fields
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('verify-email/<str:uidb64>/<str:token>/', VerifyEmailView.as_view()),
    path('login/', LoginView.as_view()),
    path('check-fields/<str:email>/<str:username>/<str:phone_number>/', check_fields),
    path('logout/',LogoutView.as_view()),
    path('orders/',ProdigiOrdersAPIView.as_view()),
]