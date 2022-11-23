from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Gift

def index(request):
    return JsonResponse({'message': 'GIFT OK'})

@csrf_exempt
def gift_list(request):
    if request.method == 'GET':
        gift_all_list = [gift for gift in Gift.objects.all().values()]
        return JsonResponse(gift_all_list, safe=False)