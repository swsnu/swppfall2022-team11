import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "..";
import { BACKEND_URL } from "../../utils";

export interface EventType {
    id: number;
    title: string;
    date: Date;
    gift: boolean;
    letter:boolean;
}

export interface EventState {
    events: EventType[];
    selectedEvent: EventType | null;
}

const christmas: EventType = {
    id: 0,
    title: "크리스마스",
    date: new Date("December 25, 2022 00:00:00"),
    gift: false,
    letter: false
}

const initialState: EventState = {
    events: [christmas],
    selectedEvent: null,
}

export const fetchEvents = createAsyncThunk("todo/fetchEvents", async () => {
    const response = await axios.get<EventType[]>("/api/event/");
    return response.data;
}
);

export const fetchEvent = createAsyncThunk(
    "todo/fetchEvent",
    async (id: EventType["id"], { dispatch }) => {
        const response = await axios.get(BACKEND_URL + `/api/event/${id}/`);
        return response.data ?? null;
    }
);

export const postEvent = createAsyncThunk(
    "todo/postEvent",
    async (td: Partial<EventType>, { dispatch }) => {
        const response = await axios.post(BACKEND_URL+"/api/event/", td);
        dispatch(eventActions.addEvent(response.data));
    }
);

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (id: EventType["id"], { dispatch }) => {
        await axios.delete(`/api/event/${id}/`);
        dispatch(eventActions.deleteEvent({ targetId: id }));
    }
)


export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        deleteEvent: (state, action: PayloadAction<{ targetId: number }>) => {
            const deleted = state.events.filter((event) => {
                return event.id !== action.payload.targetId;
            });
            state.events = deleted;
        },
        addEvent: (state, action: PayloadAction<{ title: string; date: Date }>) => {
            const newEvent = {
                id: state.events[state.events.length - 1].id + 1,
                title: action.payload.title,
                date: action.payload.date,
                gift:false,
                letter:false
            };
            state.events.push(newEvent);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.events = action.payload;
        });
        builder.addCase(fetchEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload;
        });
    },
})

export const eventActions = eventSlice.actions;
export const selectEvent = (state: RootState) => state.event;

export default eventSlice.reducer;