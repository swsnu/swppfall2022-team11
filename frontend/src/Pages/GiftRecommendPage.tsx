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
      <div>
        <h1>네이버 실시간 인기 쇼핑 키워드</h1>
        <h2>연령대</h2>
        <button onClick={() => setKeywordAge('M01')}>10대 남성</button>
        <button onClick={() => setKeywordAge('M02')}>20대 남성</button>
        <button onClick={() => setKeywordAge('M03')}>30대 남성</button>
        <button onClick={() => setKeywordAge('F01')}>10대 여성</button>
        <button onClick={() => setKeywordAge('F02')}>20대 여성</button>
        <button onClick={() => setKeywordAge('F03')}>30대 여성</button>
        <h2>카테고리</h2>
        <button onClick={() => setKeywordCategory('ALL')}>전품목</button>
        <button onClick={() => setKeywordCategory('50000000')}>패션의류</button>
        <button onClick={() => setKeywordCategory('50000001')}>패션잡화</button>
        <button onClick={() => setKeywordCategory('50000002')}>화장품미용</button>
        <button onClick={() => setKeywordCategory('50000003')}>디지털가전</button>
        <button onClick={() => setKeywordCategory('50000004')}>가구인테리어</button>
        <button onClick={() => setKeywordCategory('50000006')}>식품</button>
        <button onClick={() => setKeywordCategory('50000007')}>스포츠레저</button>
        <button onClick={() => setKeywordCategory('50000008')}>생활건강</button>
        <button onClick={() => setKeywordCategory('50000009')}>여가생활편의</button>
        <div>
          <button onClick={fetchKeywords}>불러오기</button>
        </div>


        <ul>{keywordList.map(keyword => (<li>{keyword}</li>))}</ul>
        <h1>운영자가 직접 큐레이팅한 선물 목록</h1>
        <button onClick={() => { setSearchPrice(1) }}>~3만원</button>
        <button onClick={() => { setSearchPrice(2) }}>3만원~5만원</button>
        <button onClick={() => { setSearchPrice(3) }}>5만원~10만원</button>
        <button onClick={() => { setSearchPrice(4) }}>10만원~</button>
        <button onClick={() => { setSearchPrice(0) }}>전체보기</button>
        <div>
          <button>인기순으로 보기</button>
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