import Navigation from "../components/Navigation";
import Gift from "../components/Gift";
import { fetchGifts, selectGift } from "../store/slices/gift";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const GiftRecommendPage = () => {
  const giftState = useSelector(selectGift);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGifts());
  }, []);

  return (
    <>
      <Navigation />
      <div>
        <h1>This is Gift Recommendation Page</h1>
        {giftState.gifts.map((data, index) => {
          return (
            <Gift key={index} {...data} />
          )
        })}
      </div>
    </>
  )
}

export default GiftRecommendPage