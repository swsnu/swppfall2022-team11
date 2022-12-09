export default function Navigation() {
  return (
    <>
      <nav className="w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-800">
        <div
          className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div
            className="w-full relative block justify-start w-auto">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white flex flex-row items-center justify-center"
              href="/">
              <img src="/logo.png" className="w-10 h-10" />
              <span className="pl-2 font-serif">Letter of Cupid</span>
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button">
            </button>
          </div>
          <div
            className="flex flex-grow items-center bg-transparent shadow-none">
            <ul className="hidden lg:flex flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/create">
                  <i
                    className="lg:text-gray-300 text-gray-500 fa-solid fa-pen-nib text-lg leading-lg mr-2">
                  </i>
                  편지생성</a>
              </li>
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/gift">
                  <i
                    className="lg:text-gray-300 text-gray-500 fa-solid fa-gift text-lg leading-lg mr-2">
                  </i>
                  선물추천</a>
              </li>
            </ul>
            <ul className="flex flex-row ml-auto">
              <li className="flex items-center">
                <a
                  className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                  href="/create">
                  편지생성
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
