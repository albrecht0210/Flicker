import { createSlice } from "@reduxjs/toolkit";

const selectedCourse = localStorage.getItem("selectedCourse") ? localStorage.getItem("selectedCourse") : null;
const selectedMeetingStatus = localStorage.getItem("selectedMeetingStatus") ? localStorage.getItem("selectedMeetingStatus") : null;
const selectedMeeting = localStorage.getItem("selectedMeeting") ? localStorage.getItem("selectedMeeting") : null;

export const meetingSlice = createSlice({
    name: "meeting",
    initialState: {
        selectedCourse: Number(selectedCourse),
        selectedMeetingStatus: Number(selectedMeetingStatus),
        selectedMeeting: Number(selectedMeeting),
    },
    reducers: {
        storeCourse: (state, { payload }) => {
            state.selectedCourse = payload.selectedCourse;
        },
        storeMeetingStatus: (state, { payload }) => {
            state.selectedMeetingStatus = payload.selectedMeetingStatus;
        },
        storeMeeting: (state, { payload }) => {
            state.selectedMeeting = payload.selectedMeeting;
        }
    }
})

export const { storeCourse, storeMeetingStatus, storeMeeting } = meetingSlice.actions;