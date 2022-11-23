import Navigation from "../components/Navigation";
export default function MainPage() {
  return (
    <>
      <Navigation />
      <main className="relative w-full h-full">
        <div className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            'backgroundImage': "url(/background.jpg)"
          }}>
          <span className="w-full h-full absolute opacity-60 bg-black"></span>
        </div>

        <div className="relative flex flex-col items-center justify-center h-full pb-10">
          <div className="w-full px-4 text-center">
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl">
              AI 큐피드가
            </h1>
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl mt-2 lg:mt-4">
              당신의 연애를 성공시켜드립니다
            </h1>
            <p className="mt-2 lg:mt-4 text-lg lg:text-2xl text-gray-200">
              AI로 감동적인 연애편지를 써보세요.
            </p>
          </div>
          <a href="/login" className="rounded-xl text-lg lg:text-3xl p-4 lg:p-8 bg-gray-200 mt-20 text-gray-600 font-semibold">로그인하기</a>
          <a href="/register" className="rounded-xl text-lg lg:text-3xl p-4 lg:p-8 bg-gray-200 mt-20 text-gray-600 font-semibold">지금 시작하기</a>
        </div>
      </main>
    </>
  )
}
