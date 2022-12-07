import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "..";
import { BACKEND_URL } from "../../utils";

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

const initialState: GiftState = {
    gifts: [],
    selectedGift: null,
}

export const fetchGifts = createAsyncThunk("todo/fetchGifts", async () => {
    const response = await axios.get<GiftType[]>(BACKEND_URL+ "/gift/");
    return response.data;
}
);

export const fetchGift = createAsyncThunk(
    "todo/fetchEvent",
    async (id: GiftType["id"]) => {
        const response = await axios.get(BACKEND_URL+ `/api/gift/${id}/`);
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