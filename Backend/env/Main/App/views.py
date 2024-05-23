from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import  User
from .serializer import UserSerializer, MyToken,RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics,status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError

class MyTokenView(TokenObtainPairView):
    serializer_class = MyToken
    
    def post(self, request, *args, **kwargs):
        data = request.data
        print("Data coming from client:", data)      
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            data = response.data
            if 'access' in data:
                return response
            else:
                message = "Invalid credentials. Please check you email and password"
                return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST) 
        return response
    def get_serializer_context(self):
        return super().get_serializer_context()

class SuperuserToken(TokenObtainPairView):
    serializer_class = MyToken
    def post(self, request, *args, **kwargs):
        user = User.objects.get(email = request.data['email'])
        print(user.email)
        print(user.is_superuser)
        if not user.is_superuser:
            return Response({"message":"user is not super user"}, status=status.HTTP_403_FORBIDDEN)
        response = super().post(request, *args, **kwargs)
        return response
    def get_serializer_context(self):
        return super().get_serializer_context()



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        print(request.data)
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response({'email':"Email already exists "}, status=status.HTTP_400_BAD_REQUEST)
        try:
            response = super().post(request, *args, **kwargs)
            return response
        except ValidationError as e:
             return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/register/',
        '/api/token/refresh/',
        '/api/admintoken',
    ]
    return Response(routes)


@api_view(['GET','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def dashboard(request,id=None):
    users = User.objects.exclude(id=request.user.id)
    if request.method == "GET":
      if id is not None:
          user = get_object_or_404(User,id=id)
          serializer = UserSerializer(user)
          return Response(serializer.data, status=status.HTTP_200_OK)
      serializer = UserSerializer(users, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        if id is None:
            return Response("Id is required ", status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(User,id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        user = get_object_or_404(User,id=id)
        if id is None:
            return Response("Id is Required for editing ", status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(user, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search(request):
    if request.method == "POST":
        word = request.data['word']
        users = User.objects.filter(username__icontains=word)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
        