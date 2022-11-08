import json
from json.decoder import JSONDecodeError

from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return JsonResponse({'message': 'OK'})

@csrf_exempt
def generate(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            letter_type = json.loads(body)['letterType']
            feel = json.loads(body)['feel']
            voice = json.loads(body)['voice']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        response_dict = {'generatedText': 'generatedText', 'letterType': letter_type, 'feel': feel, 'voice': voice}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])
