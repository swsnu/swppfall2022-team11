import Navigation from "../components/Navigation";
import Gift from "../components/Gift";
import { fetchGifts, selectGift } from "../store/slices/gift";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../utils";



const GiftRecommendPage = () => {
  const giftState = useSelector(selectGift);
  const dispatch = useDispatch<AppDispatch>();
  const [searchPrice, setSearchPrice] = useState(0);
  const [keywordAge, setKeywordAge] = useState('A00')
  const [keywordCategory, setKeywordCategory] = useState('All')
  const [keywordList, setKeywordList] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    dispatch(fetchGifts());
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, []);


  const fetchKeywords = async () => {
    try {
      setError(false);
      setKeywordList([]);
      setLoading(true);
      const paylaod = { 'category_id': keywordCategory, 'age_gender': keywordAge }
      const response = await axios.post(BACKEND_URL + "/gift/shop_keyword/", paylaod);
      setKeywordList(response.data)
    }
    catch (e) {
      setError(true)
    }
    setLoading(false);
  }

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center mt-15 mb-15 text-xl font-bold text-gray-600">네이버 실시간 인기 쇼핑 키워드</h1>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button onClick={() => setKeywordAge('M01')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            10대 남성
          </button>
          <button onClick={() => setKeywordAge('M02')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            20대 남성
          </button>
          <button onClick={() => setKeywordAge('M03')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            30대 남성
          </button>
          <button onClick={() => setKeywordAge('F01')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            10대 여성
          </button>
          <button onClick={() => setKeywordAge('F02')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            20대 여성
          </button>
          <button onClick={() => setKeywordAge('F03')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            30대 여성
          </button>
        </div>
        <div className="inline-flex rounded-md shadow-sm mt-5" role="group">
          <button onClick={() => setKeywordCategory('ALL')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            전품목
          </button>
          <button onClick={() => setKeywordCategory('50000000')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            패션의류
          </button>
          <button onClick={() => setKeywordCategory('50000001')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            패션잡화
          </button>
          <button onClick={() => setKeywordCategory('50000002')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            화장품미용
          </button>
          <button onClick={() => setKeywordCategory('50000003')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            디지털가전
          </button>
          <button onClick={() => setKeywordCategory('50000004')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            가구인테리어
          </button>
          <button onClick={() => setKeywordCategory('50000006')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            식품
          </button>
          <button onClick={() => setKeywordCategory('50000007')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            스포츠레저
          </button>
          <button onClick={() => setKeywordCategory('50000008')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            생활건강
          </button>
          <button onClick={() => setKeywordCategory('50000009')} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            여가생활편의
          </button>
        </div>
        <div>
          <button className="mt-5 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={fetchKeywords}>불러오기</button>
        </div>

        <table className="mt-5 shadow-lg bg-transparent border-collapse max-w-lg w-full">
          <tbody>
            <tr>
              <th className="bg-gray-100 border border-gray-400 text-left px-8 py-4">랭킹</th>
              <th className="bg-gray-100 border border-gray-400 text-left px-8 py-4">선물 키워드</th>
            </tr>
            {keywordList.map((keyword, index) => (<tr key={`${index}-${keyword}`}>
              <td className="border border-gray-400 px-8 py-4">{index}</td>
              <td className="border border-gray-400 px-8 py-4">{keyword}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <hr className="mt-5 border-b border-black w-full" />
        <h1 className="mt-5 text-center mt-15 mb-15 text-xl font-bold text-gray-600">운영자가 직접 큐레이팅한 선물 목록</h1>

        <div className="mt-5 inline-flex rounded-md shadow-sm mt-5" role="group">
          <button onClick={() => setSearchPrice(1)} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            ~3만원
          </button>
          <button onClick={() => setSearchPrice(2)} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            3만원~5만원
          </button>
          <button onClick={() => setSearchPrice(3)} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            5만원~10만원
          </button>
          <button onClick={() => setSearchPrice(4)} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            10만원~
          </button>
          <button onClick={() => setSearchPrice(0)} type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
            전체보기
          </button>
        </div>
        <div>
          <button className="mt-2 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">인기순으로 보기</button>
        </div>
        {giftState.gifts.filter((data) => {
          if (searchPrice === 0) {
            return data
          }
          else if (searchPrice == 1) {
            if (data.price < 30000) {
              return data
            }
          }
          else if (searchPrice == 2) {
            if (data.price > 30000 && data.price < 50000) {
              return data
            }
          }
          else if (searchPrice == 3) {
            if (data.price > 50000 && data.price < 100000) {
              return data
            }
          }
          else {
            if (data.price > 100000) {
              return data
            }
          }
        }).map((data, index) => {
          return (
            <Gift key={index} {...data} />
          )
        })}
      </div>
    </>
  )
}

export default GiftRecommendPage