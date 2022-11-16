import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Navigation from "../components/Navigation";

type LetterType = '100일 기념편지' | '고백편지' | '일상편지'
type Feel = '달달한' | '감동적인' | '은은한'
type Voice = '가벼운 말투' | '진중한 말투' | '내 말투'

export default function CreatePage() {
  const navigate = useNavigate()

  const [letterType, setLetterType] = useState<LetterType | null>(null)
  const [feel, setFeel] = useState<Feel | null>(null)
  const [voice, setVoice] = useState<Voice | null>(null)
  const [myVoice, setMyVoice] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState<string>('')
  const onGenerate = () => {
    setIsLoading(true)
    fetch('https://qria-swpp-project.onrender.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feel, voice, letterType })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setIsLoading(false)
        setGeneratedLetter(res['generatedText'])
      })
  }

  return (
    <>
      <Navigation />
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center w-full pt-20">
          <h1 className="text-black font-semibold text-2xl">어떤 편지를 쓰시나요?</h1>
          <div className="mt-3 flex flex-row w-full justify-center">
            <button
              onClick={() => setLetterType('100일 기념편지')}
              className={twMerge(
                "bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                letterType === '100일 기념편지' && 'bg-gray-800 text-white border-transparent',
              )}>
              100일 기념편지
            </button>
            <button
              onClick={() => setLetterType('고백편지')}
              className={twMerge(
                "ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                letterType === '고백편지' && 'bg-gray-800 text-white border-transparent',
              )}>
              고백편지
            </button>
            <button
              onClick={() => setLetterType('일상편지')}
              className={twMerge(
                "ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                letterType === '일상편지' && 'bg-gray-800 text-white border-transparent',
              )}>
              일상편지
            </button>
          </div>
          {letterType != null && <>
            <h1 className="mt-5 text-black font-semibold text-2xl">어떤 느낌으로 쓸까요?</h1>
            <div className="mt-3 flex flex-row w-full justify-center">
              <button
                onClick={() => setFeel('달달한')}
                className={twMerge(
                  "bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                  feel === '달달한' && 'bg-gray-800 text-white border-transparent',
                )}>
                달달한
              </button>

              <button
                onClick={() => setFeel('감동적인')}
                className={twMerge(
                  "ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                  feel === '감동적인' && 'bg-gray-800 text-white border-transparent',
                )}>
                감동적인
              </button>

              <button
                onClick={() => setFeel('은은한')}
                className={twMerge(
                  "ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                  feel === '은은한' && 'bg-gray-800 text-white border-transparent',
                )}>
                은은한
              </button>
            </div>
          </>}
          {feel != null && <>
            <h1 className="mt-5 text-black font-semibold text-2xl">어떤 말투로 쓸까요?</h1>
            <div className="mt-3 flex flex-row w-full justify-center">
              <button
                onClick={() => setVoice('가벼운 말투')}
                className={twMerge(
                  "bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                  voice === '가벼운 말투' && 'bg-gray-800 text-white border-transparent',
                )}>
                가벼운 말투
              </button>

              <button
                onClick={() => setVoice('진중한 말투')}
                className={twMerge(
                  "ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                  voice === '진중한 말투' && 'bg-gray-800 text-white border-transparent',
                )}>
                진중한 말투
              </button>

              <button
                onClick={() => setVoice('내 말투')}
                className={twMerge(
                  "ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded",
                  voice === '내 말투' && 'bg-gray-800 text-white border-transparent',
                )}>
                내 말투
              </button>
            </div>
          </>}
          {voice === '내 말투' && <>
            <h1 className="mt-5 text-black font-semibold text-2xl">내 말투를 입력해주세요</h1>
            <div className="mt-3 px-5 flex flex-row w-full justify-center">
              <textarea
                className="border-2 border-gray-200 rounded w-full p-4"
                value={myVoice}
                onChange={e => setMyVoice(e.target.value)}
                placeholder="내 말투를 입력해주세요"
              />
            </div>
          </>}
          {voice != null && <>
            <h1 className="mt-5 text-black font-semibold text-2xl">"{letterType}"를 "{feel} 느낌"으로 "{voice}"로 써드릴까요?</h1>
            <button
              onClick={onGenerate}
              className="mt-3 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
              네! 써주세요!
            </button>
          </>}
          {isLoading && <div className="mt-3 flex flex-col w-full justify-center items-center">
            <span className="text-black">편지 쓰는 중...</span>
            <svg className="mt-2" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#000">
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite" />
                  </path>
                </g>
              </g>
            </svg>
          </div>}
          {generatedLetter.length > 0 && <>
            <h1 className="mt-5 text-black font-semibold text-2xl">AI 큐피드가 쓴 편지</h1>
            <div className="mt-3 flex flex-row w-full px-5 justify-center">
              <textarea
                className="border-2 border-gray-200 rounded w-full p-4"
                value={generatedLetter}
                readOnly
              />
            </div>
            <div className="mt-3 flex flex-row w-full justify-center">
              <button
                onClick={() => navigate('/decorate',{state:{text:generatedLetter}})}
                className="bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
                편지지 꾸미기
              </button>
              <button
                onClick={() => navigate('/gift')}
                className="ml-2 bg-transparent hover:bg-gray-800 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
                선물 추천
              </button>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}