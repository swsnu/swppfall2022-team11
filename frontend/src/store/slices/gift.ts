import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "..";

export interface GiftType {
    id: number;
    name: string;
    price: number;
    link: string;
    img: string;
}

export interface GiftState {
    gifts: GiftType[];
    selectedGift: GiftType | null;
}

const data1 = {
    id: 0,
    name: "아이폰13",
    price: 814000,
    link: "https://search.shopping.naver.com/catalog/29030650586?query=%EC%95%84%EC%9D%B4%ED%8F%B0&NaPm=ct%3Dlas95olc%7Cci%3D2e64604169e3195b6eb0313957707e46d71d6c3b%7Ctr%3Dslsl%7Csn%3D95694%7Chk%3D39700fc049eeef00b04a43ee63539f0de06a5af2",
    img: "https://shopping-phinf.pstatic.net/main_2903065/29030650586.20220317113150.jpg?type=f640"
}

const initialState: GiftState = {
    gifts: [data1],
    selectedGift: null,
}

export const fetchGifts = createAsyncThunk("todo/fetchGifts", async () => {
    const response = await axios.get<GiftType[]>("/api/gift/");
    return response.data;
}
);

export const fetchGift = createAsyncThunk(
    "todo/fetchEvent",
    async (id: GiftType["id"]) => {
        const response = await axios.get(`/api/gift/${id}/`);
        return response.data ?? null;
    }
);

export const giftSlice = createSlice({
    name: 'gift',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGifts.fulfilled, (state, action) => {
            state.gifts = action.payload;
        });
        builder.addCase(fetchGift.fulfilled, (state, action) => {
            state.selectedGift = action.payload;
        });
    },
})

export const giftActions = giftSlice.actions;
export const selectGift = (state: RootState) => state.gift;

export default giftSlice.reducer;