import json
from json.decoder import JSONDecodeError

from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from letter.letter import generate_text


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
        response_dict = {'generatedText': generate_text(letter_type, feel, voice)}
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def debug(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            letter_type = json.loads(body)['letterType']
            feel = json.loads(body)['feel']
            voice = json.loads(body)['voice']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        response_dict = {'generatedText': 'generatedText', 'letterType': letter_type, 'feel': feel, 'voice': voice}
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])
