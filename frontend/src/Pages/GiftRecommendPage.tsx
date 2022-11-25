import Navigation from "../components/Navigation";
import Gift from "../components/Gift";
import { fetchGifts, selectGift } from "../store/slices/gift";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const GiftRecommendPage = () => {
  const giftState = useSelector(selectGift);
  const dispatch = useDispatch<AppDispatch>();
  const [searchPrice, setSearchPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchGifts());
  }, []);
  console.log(searchPrice)

  return (
    <>
      <Navigation />
      <div>
        <h1>운영자가 직접 큐레이팅한 선물 목록</h1>
        <button onClick={()=>{setSearchPrice(1)}}>~3만원</button>
        <button onClick={()=>{setSearchPrice(2)}}>3만원~5만원</button>
        <button onClick={()=>{setSearchPrice(3)}}>5만원~10만원</button>
        <button onClick={()=>{setSearchPrice(4)}}>10만원~</button>
        <button onClick={()=>{setSearchPrice(0)}}>전체보기</button>
        <div>
          <button>인기순으로 보기</button>
        </div>
        {giftState.gifts.filter((data)=>{
          if(searchPrice===0){
            return data
          }
          else if(searchPrice==1){
            if (data.price<30000){
              return data
            }
          }
          else if(searchPrice==2){
            if (data.price>30000 && data.price<50000){
              return data
            }
          }
          else if(searchPrice==3){
            if (data.price>50000 && data.price<100000){
              return data
            }
          }
          else if(searchPrice==4){
            if (data.price>100000){
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