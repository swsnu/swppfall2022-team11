import json
from json.decoder import JSONDecodeError
from django.contrib.auth import authenticate
from  django.contrib.auth  import login as auth_login
from  django.contrib.auth  import logout as auth_logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Anniversary,UserFullInfo
from django.contrib.auth.models import User




def register(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode())
            username = body['username']
            email = body['email']
            password = body['password']
            lovername = body['lovername']
            lovernickname = body['lovernickname']
            Anniversary = body['Anniversary']
            user=authenticate(username=email,password=password)
            if user is not None:
                response_dict={"response":"Already signed up user"}
                return JsonResponse(response_dict, status=200)
            else:
                user=User.objects.create_user(username=email, password=password, first_name=username)
                userinfo=UserFullInfo(user=user,lovername=lovername,lovernickname=lovernickname)
                userinfo.save()
                for anniv in Anniversary:
                    anniv=Anniversary(user=user,letter=False,gift=False)
                    anniv.save()                   
                return HttpResponse(status=201) 
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
    else:
        return HttpResponseNotAllowed(['POST'])
def login(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            user=authenticate(request,username=email,password=password)
            if user is not None:
                auth_login(request,user)
                request.session['user_id']=user.id
                return HttpResponse(status=204)
            else:
                
                return HttpResponse(status=401)
        except Exception  as e:
           
            return HttpResponse(status=400)
    else:
        return HttpResponseNotAllowed(['POST'])    
def logout(request):
    if request.method == 'GET':
        if request.user.is_authenticated==True:
            auth_logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])            
def info(request):
    if request.user.is_authenticated==False:
        return HttpResponse(status=401)
    user = User.objects.get(username=request.user.username)    
    if request.method == 'GET':
       Anniv_list = [{"name":Anniv.name,"date":Anniv.date,"letter":Anniv.letter ,"gift": Anniv.gift } for Anniv in user.Annivlist.all()]     
       Info={"name":user.first_name, "lovername":user.info.lovername,"lovernickname":user.info.lovernickname}
       response={"Annivlist":Anniv_list,"fullinfo":Info}
       return JsonResponse(response,safe=False)  
    if request.method == 'PUT':
        body=json.loads(request.body.decode())
        name=body["name"]
        letter=body["letter"]
        gift=body["gift"]
        anniv = Anniversary.objects.filter(user=user,name=name).first()
        anniv.letter=letter
        anniv.gift=gift
        anniv.save()
        return HttpResponse(status=200) 
    if request.method == 'DELETE':
        body=json.loads(request.body.decode())
        name=body["name"]
        anniv = Anniversary.objects.filter(user=user,name=name).first()
        anniv.delete()
        return HttpResponse(status=200)        
    if request.method == 'POST':
        body=json.loads(request.body.decode())
        name=body["name"]
        letter=body["letter"]
        gift=body["gift"]
        date=body["date"]
        anniv=Anniversary(user=user,name=name,date=date,letter=letter,gift=gift)
        anniv.save()
        return HttpResponse(status=200)

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])        

          
                   