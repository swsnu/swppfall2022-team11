from django.http import JsonResponse
from django.views.decorators.http import require_safe

@require_safe
def index(request):
    return JsonResponse({'message': 'GIFT OK'})
