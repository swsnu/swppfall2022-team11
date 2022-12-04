from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Gift
import requests
from bs4 import BeautifulSoup 
import json


@csrf_exempt
def gift_list(request):
    if request.method == 'GET':
        gift_all_list = [gift for gift in Gift.objects.all().values()]
        return JsonResponse(gift_all_list, safe=False)


def shop_keyword(request):
   if request.method == 'POST':
        body = request.body.decode()
        body = eval(body)
        age_gender = body["age_gender"]
        category_id = body["category_id"]
        print(body)
        print(age_gender)
        url = f'https://search.shopping.naver.com/best/category/keyword?categoryCategoryId={category_id}&categoryDemo={age_gender}&categoryRootCategoryId={category_id}&chartRank=1&period=P1D'

        headers = { 'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'Accept-Encoding': 'gzip'
        }

        raw = requests.get(url=url, headers=headers)

        html = BeautifulSoup(raw.text, 'html.parser')

        test =html.find('script', {'id' : '__NEXT_DATA__'}).text #텍스트만

        dict_result = json.loads(test)
        popular_kws = dict_result['props']['pageProps']['dehydratedState']['queries'][2]['state']['data']['charts']
        keyword_list = [keyword['exposeKeyword'] for keyword in popular_kws]

        return JsonResponse(keyword_list, safe= False)


