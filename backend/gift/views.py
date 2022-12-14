from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Gift
import requests
from bs4 import BeautifulSoup 
import json
import random


@csrf_exempt
def gift_list(request):
    if request.method == 'GET':
        #body = request.body.decode()
        #body = eval(body)
        #section = body['section']
        url = 'https://m.shopping.naver.com/gift/plans/641486?NaPm=ct%3Dlbmgravk%7Cci%3Dshoppingwindow%7Ctr%3Dgifth%7Chk%3D0da8bda02a17df2f2d763cf090eb772e320b6174%7Ctrx%3D&first=6052509554'
        url1 = 'https://m.shopping.naver.com/gift/plans/641486?first=7681567774&NaPm=ct%3Dlbmie4e0%7Cci%3Dshoppingwindow%7Ctr%3Dgifth%7Chk%3De49a2edb77689348a8eb9bbfe1b514212350de02%7Ctrx%3D'
        url2 = 'https://m.shopping.naver.com/gift/plans/641486?first=5866760828&NaPm=ct%3Dlbmigf84%7Cci%3Dshoppingwindow%7Ctr%3Dgifth%7Chk%3Dd4dcd75040c1f2b65fcd1fe82ae7bfccb28efbb3%7Ctrx%3D'
        headers = { 'Accept-Language' : 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'Accept-Encoding': 'gzip'
        }
        raw = requests.get(url=url, headers=headers)
        html = BeautifulSoup(raw.text, 'html.parser')
        gift = []
        for i in range(2, 21):
            img = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div.gp3TgRTw_E > img')['src']
            price = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div._1OqXul1sMG > div > span').get_text()
            name = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div._1OqXul1sMG > strong').get_text()
            price = int(price.replace(',',''))
            link = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > a')['href']
            data = {"img":img, "name":name, "price":price, "link":link}
            gift.append(data)
        raw = requests.get(url=url1, headers=headers)
        html = BeautifulSoup(raw.text, 'html.parser')
        for i in range(2, 21):
            img = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div.gp3TgRTw_E > img')['src']
            price = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div._1OqXul1sMG > div > span').get_text()
            name = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div._1OqXul1sMG > strong').get_text()
            price = int(price.replace(',',''))
            link = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > a')['href']
            data = {"img":img, "name":name, "price":price, "link":link}
            gift.append(data)
        raw = requests.get(url=url2, headers=headers)
        html = BeautifulSoup(raw.text, 'html.parser')
        for i in range(2, 21):
            img = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div.gp3TgRTw_E > img')['src']
            price = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div._1OqXul1sMG > div > span').get_text()
            name = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > div._1OqXul1sMG > strong').get_text()
            price = int(price.replace(',',''))
            link = html.select_one(f'#content > div > div._1rlmqfkmSs > div > ul > li:nth-child({i}) > div > a')['href']
            data = {"img":img, "name":name, "price":price, "link":link}
            gift.append(data)
        random.shuffle(gift)        

        
        return JsonResponse(gift, safe=False)


def shop_keyword(request):
   if request.method == 'POST':
        body = request.body.decode()
        body = eval(body)
        age_gender = body["age_gender"]
        category_id = body["category_id"]
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


