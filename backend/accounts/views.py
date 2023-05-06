from django.http import JsonResponse
from django.views import View
from rest_framework import status,views,generics
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import CustomUser
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str

def send_verification_email(user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verification_url = f'http://localhost:4200/activate-account/{uid}/{token}/'
    subject = 'Verify your email address'
    message = f'Please click on the following link to verify your email address: {verification_url}'
    from_email = 'your_email@gmail.com'
    recipient_list = [user.email]
    send_mail(subject, message, from_email, recipient_list)

class RegisterView(generics.RetrieveAPIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()
            send_verification_email(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def check_fields(request, email, username, phone_number):
    email_exists = CustomUser.objects.filter(email=email).exists()
    username_exists = CustomUser.objects.filter(username=username).exists()
    phone_number_exists = CustomUser.objects.filter(phone_number=phone_number).exists()

    data = {
        'email_exists': email_exists,
        'username_exists': username_exists,
        'phone_number_exists': phone_number_exists,
    }

    return JsonResponse(data)

class VerifyEmailView(views.APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'failure'}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(views.APIView):
    def post(self, request):
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        try:
            user = CustomUser.objects.get(email=username_or_email)
            username = user.username
        except CustomUser.DoesNotExist:
            username = username_or_email
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'failure'}, status=status.HTTP_400_BAD_REQUEST)