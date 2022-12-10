import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer, { EventState } from "./event";
import { fetchEvents, fetchEvent, postEvent, deleteEvent } from "./event";
describe("event reducer", () => {
    let store: EnhancedStore<
        { event: EventState },
        AnyAction,
        [ThunkMiddleware<{ event: EventState }, AnyAction, undefined>]
    >;
    const fakeEvent = {
        id: 0,
        title: "크리스마스",
        gift: false,
        letter: false,
        date: new Date("December 25, 2022"),
    };
    const fakeEvent2 = {
        id: 1,
        title: "새해",
        gift: false,
        letter: false,
        date: new Date("January 1, 2023"),
    };

    beforeAll(() => {
        store = configureStore({ reducer: { event: reducer }, middleware: [thunk] as [ThunkMiddleware] });
    });
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            events: [fakeEvent],
            selectedEvent: null,
        });
    });
    it("should handle fetchEvents", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [fakeEvent] });
        await store.dispatch(fetchEvents());
        expect(store.getState().event.events).toEqual([fakeEvent]);
    });
    it("should handle fetchEvent", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeEvent });
        await store.dispatch(fetchEvent(1));
        expect(store.getState().event.selectedEvent).toEqual(fakeEvent);
    });
    it("should handle fetchEvent when null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(fetchEvent(2));
        expect(store.getState().event.selectedEvent).toEqual(null);
    });
    it("should handle postEvent", async () => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data: fakeEvent2
        });
        await store.dispatch(postEvent({ title: "새해", date: new Date("January 1, 2023") }));
        expect(store.getState().event.events).toEqual([fakeEvent, fakeEvent2]);
    });

    it("should handle deleteEvent", async () => {
        axios.delete = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(deleteEvent(0));
        expect(store.getState().event.events).toEqual([fakeEvent2]);
    });


});