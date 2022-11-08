import os
import requests


def kogpt_api(prompt, max_tokens = 1, temperature = 1.0, top_p = 1.0, n = 1):
    response = requests.post(
        'https://api.kakaobrain.com/v1/inference/kogpt/generation',
        json = {
            'prompt': prompt,
            'max_tokens': max_tokens,
            'temperature': temperature,
            'top_p': top_p,
            'n': n
        },
        headers = {
            'Authorization': 'KakaoAK ' + os.environ['KAKAO_API_KEY'],
            'Content-Type': 'application/json'
        }
    )
    response.raise_for_status()
    return response.json()


def generate_text(letter_type: str, feel: str, voice: str):
    prompt = f'''\
    진중하고 달달한 말투로 여자친구에게 보내는 100일 기념 편지:
    우리가 만난게 엊그제 같은데 벌써 100일이나 됐네?
    처음 너를 봤을 때가 생각나.
    어떻게 저렇게 예쁜 애가 있나? 설레었어.
    너의 그 환한 웃음이 너무 좋았어.

    ###

    진중하고 달달한 말투로 여자친구에게 보내는 100일 기념 편지:
    난 네가 항상 행복했으면 좋겠어.
    네가 웃으면 나는 온 세상을 다 가진 것 같아
    그런  너의 눈에서 눈물이 나지 않게, 마음이 아프지 않게 항생 내가 노력할게.
    날이 갈수록 너와 함께하는 시간이 참 축복 받은 시간이라고 느껴!

    ###

    {feel} 말투로 {voice}로 여자친구에게 보내는 {letter_type}:
    '''
    generated_texts = kogpt_api(
        prompt = prompt,
        max_tokens = 128,
        temperature = .7,
        top_p = .9,
        n = 1
    )

    return generated_texts['generations'][0]['text'].split('###')[0]
