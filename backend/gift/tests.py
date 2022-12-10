from django.test import TestCase, Client
from django.utils.encoding import force_str
from .models import Gift
import json

class IndexTest(TestCase):

    def test_index(self):
        response = self.client.get('/gift/')
        self.assertEqual(response.status_code, 200)

    def test_str(self):
        gift = Gift.objects.create(name='Test Gift')
        self.assertEqual(str(gift), 'Test Gift')

    def test_keyword(self):
        response = self.client.post('/gift/shop_keyword/',
        json.dumps({"age_gender":"M01", "category_id":"ALL"}),
        content_type='application/json')
        self.assertEqual(response.status_code, 200)
        
