<<<<<<< HEAD
from django.shortcuts import render

# Create your views here.
=======
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({"message": "Welcome to the Clearlog API"})
>>>>>>> dev
