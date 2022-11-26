from django.test import TestCase, Client
from django.utils.encoding import force_str
from .models import Gift

class IndexTest(TestCase):

    def test_index(self):
        response = self.client.get('/gift/')
        self.assertEqual(response.status_code, 200)

    def test_str(self):
        gift = Gift.objects.create(name='Test Gift')
        self.assertEqual(str(gift), 'Test Gfit')
        