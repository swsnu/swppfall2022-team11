from json import dumps as json_dumps
import unittest.mock

from django.test import TestCase, Client
from django.utils.encoding import force_str

from letter.letter import kogpt_generate_text
from letter.letter import generate_text


class TestClient(Client):
    """Helper test client"""

    def post(self, path, *args, json=None, **extra):
        # Tried to match "requests" API
        if json is not None:
            args = json_dumps(json), "application/json"
        return super().post(path, *args, **extra)

    def put(self, path, *args, json=None, **extra):
        if json is not None:
            args = json_dumps(json), "application/json"
        return super().put(path, *args, **extra)


class IndexTest(TestCase):

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(force_str(response.content), {'message': 'OK'})


class GenerateAPITest(TestCase):
    def setUp(self):
        self.client = TestClient(enforce_csrf_checks=True)

    def test_generate(self):
        generate_text_patch = unittest.mock.patch(
            'letter.views.generate_text', return_value="Iloveyou")
        with generate_text_patch:
            response = self.client.post('/generate', json={
                'letterType': 'letter-type',
                'feel': 'feel',
                'voice': 'voice,'
            })
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(force_str(response.content), {
                             'generatedText': 'Iloveyou'})

    def test_generate_notallowed(self):
        response = self.client.get('/generate')
        self.assertEqual(response.status_code, 405)

    def test_generate_badrequest(self):
        response = self.client.post('/generate', json={})
        self.assertEqual(response.status_code, 400)


class GenerateUnitTest(TestCase):
    def test_kogpt_generate_text(self):
        response_mock = unittest.mock.MagicMock()
        response_mock.json.return_value = {
            'generations': [
                {'text': 'Iloveyou'}
            ]
        }
        requests_patch = unittest.mock.patch(
            'letter.letter.requests.post', return_value=response_mock)
        with requests_patch:
            self.assertEqual(kogpt_generate_text(
                'letter-type', 'feel', 'voice'), 'Iloveyou')

    def test_generate_text(self):
        response_mock = unittest.mock.MagicMock()
        response_mock.json.return_value = {
            'choices': [
                {'text': 'Iloveyou'}
            ]
        }
        requests_patch = unittest.mock.patch(
            'letter.letter.requests.post', return_value=response_mock)
        with requests_patch:
            self.assertEqual(generate_text(
                'letter-type', 'feel', 'voice'), 'Iloveyou')
