from django.test import TestCase
from django.test import Client
from django.contrib.auth.models import User
from .models import Anniversary,UserFullInfo
import json

# Create your tests here.
class UserTestCase(TestCase):
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/user/register/', json.dumps({'email': 'chris', 'password': 'chris','username':'juhwan','lovername':'jun','lovernickname':'kit','Anniversary':[]}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response
        response = client.get('/user/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/user/register/', json.dumps({'email': 'chris', 'password': 'chris','username':'juhwan','lovername':'jun','lovernickname':'kit','Anniversary':[]}),
                               content_type='application/json',HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)
        response = client.get('/user/register/', HTTP_X_CSRFTOKEN=csrftoken)  
        self.assertEqual(response.status_code, 405) 
        response = client.post('/user/token/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.post('/user/register/', json.dumps({'username2': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)                   

      # Pass csrf protection
    def test_login(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.get('/user/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/user/register/', json.dumps({'email': 'chris', 'password': 'chris','username':'juhwan','lovername':'jun','lovernickname':'kit','Anniversary':[]}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.post('/user/login/', json.dumps({'email': 'chris22', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post('/user/login/', json.dumps({'username2': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/user/login/', json.dumps({'email': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/user/login/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.get('/user/logout/')    
        response = client.post('/user/login/', json.dumps({'username2': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)
    def test_logout(self):
        client = Client()
        response = client.get('/user/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.get('/user/logout/')                      
        self.assertEqual(response.status_code, 401)   
        response = client.post('/user/register/', json.dumps({'email': 'chris', 'password': 'chris','username':'juhwan','lovername':'jun','lovernickname':'kit','Anniversary':[]}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.post('/user/login/', json.dumps({'email': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/user/logout/')                       
        self.assertEqual(response.status_code, 204)
        response = client.post('/user/login/', json.dumps({'email': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.post('/user/logout/', json.dumps({'email': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)                      
        self.assertEqual(response.status_code, 405)       
    def test_info(self):
        client = Client()
        response = client.get('/user/token/')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie
        response = client.post('/user/register/', json.dumps({'email': 'chris', 'password': 'chris','username':'juhwan','lovername':'jun','lovernickname':'kit','Anniversary':[]}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/user/info/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/user/login/', json.dumps({'email': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        response = client.get('/user/info/')
        self.assertEqual(json.loads(response.content)["fullinfo"]["lovername"],'jun')
        response = client.post('/user/info/', json.dumps({'name': 'christmas', 'date': '2022-12-25','letter':"False",'gift':"False"}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken) 
        self.assertEqual(response.status_code, 200) 
        response = client.put('/user/info/', json.dumps({'name': 'christmas', 'date': '2022-12-25','letter':"True",'gift':"False"}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken) 
        self.assertEqual(response.status_code, 200) 
        response = client.delete('/user/delete/chritsmas',
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken) 
        self.assertEqual(response.status_code, 200)                       
    