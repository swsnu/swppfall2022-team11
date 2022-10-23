from django.test import TestCase
from django.utils.encoding import force_str

class IndexTest(TestCase):

    def test_index(self):
        response = self.client.get('/gift/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(force_str(response.content), {'message': 'GIFT OK'})
