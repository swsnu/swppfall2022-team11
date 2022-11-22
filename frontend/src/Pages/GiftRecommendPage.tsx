import Navigation from "../components/Navigation";
import Gift from "../components/Gift";
import { fetchGifts, selectGift } from "../store/slices/gift";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

interface IProps {
  id: number;
  name: string;
  price: number;
  link: string;
  img: string;
}

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
        {giftState.gifts.map((data) => {
          return (
            <Gift {...data} />
          )
        })}
      </div>
    </>
  )
}

export default GiftRecommendPage