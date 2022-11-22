import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer, { GiftState } from "./gift";
import { fetchGifts, fetchGift,  } from "./gift";
describe("gift reducer", () => {
    let store: EnhancedStore<
        { gift: GiftState },
        AnyAction,
        [ThunkMiddleware<{ gift: GiftState }, AnyAction, undefined>]
    >;
    const fakeGift = {
        id: 0,
        name: "아이폰13",
        price: 814000,
        link: "https://search.shopping.naver.com/catalog/29030650586?query=%EC%95%84%EC%9D%B4%ED%8F%B0&NaPm=ct%3Dlas95olc%7Cci%3D2e64604169e3195b6eb0313957707e46d71d6c3b%7Ctr%3Dslsl%7Csn%3D95694%7Chk%3D39700fc049eeef00b04a43ee63539f0de06a5af2",
        img: "https://shopping-phinf.pstatic.net/main_2903065/29030650586.20220317113150.jpg?type=f640"
    };
    const fakeGift2 = {
        id: 0,
        name: "갤럭시중고",
        price: 50000,
        link: "https://www.naver.com",
        img: "https://via.placeholder.com/100"
    };

    beforeAll(() => {
        store = configureStore({ reducer: { gift: reducer }, middleware: [thunk] as [ThunkMiddleware]});
    });
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            gifts: [fakeGift],
            selectedGift: null,
        });
    });
    it("should handle fetchGifts", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [fakeGift, fakeGift2] });
        await store.dispatch(fetchGifts());
        expect(store.getState().gift.gifts).toEqual([fakeGift, fakeGift2]);
    });
    it("should handle fetchGift", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeGift,fakeGift2 });
        await store.dispatch(fetchGift(0));
        expect(store.getState().gift.selectedGift).toEqual(fakeGift);
    });
    it("should handle fetchGift when null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(fetchGift(2));
        expect(store.getState().gift.selectedGift).toEqual(null);
    });


});