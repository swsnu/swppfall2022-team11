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
        generated_text = generate_text(letter_type, feel, voice)
        print('generated_text:', generated_text)
        response_dict = {'generatedText': generated_text}
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])
