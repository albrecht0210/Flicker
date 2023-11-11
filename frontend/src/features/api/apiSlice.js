import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// devvariable

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        prepareHeaders: (headers, { getState }) => {
            const token = Cookies.get('accessToken')
            console.log(token);
            headers.set('Authorization', `Bearer ${token}`)
        }
    }),
    endpoints: (builder) => ({
        // Wildcat Server
        authenticate: builder.mutation({
            query: (credentials) => ({
                url: `http://localhost:8000/api/token/`,
                method: 'POST',
                body: credentials
            }),
        }),
        getAccount: builder.query({
            query: () => `http://localhost:8000/api/account/profile/`
        }),
        // Team Management Server
        getCourses: builder.query({
            query: () => `http://localhost:8080/api/course/account/`,
        }),
        getParticpants: builder.query({
            query: (courseId) => `http://localhost:8080/api/courses/${courseId}/get_members/`,
        }),
        // Flicker Server
        getMeetings: builder.query({
            query: (params) => `http://localhost:8008/api/meetings/?course=${params.courseId}&status=${params.status}`,
        }),
        getMeeting: builder.query({
            query: (meetingId) => `http://localhost:8008/api/meetings/${meetingId}/`,
        }),
        getCriterias: builder.query({
            query: (meetingId) => `http://localhost:8008/api/meetings/${meetingId}/get_criterias/`,
        }),
        getPresentors: builder.query({
            query: (meetingId) => `http://localhost:8008/api/meetings/${meetingId}/get_presentors/`,
        }),
        getPitch: builder.query({
            query: (pitchId) => `http://localhost:8008/api/pitches/${pitchId}/`,
        }),
    }),
});

export const {
    useAuthenticateMutation,
    // useDeauthenticateMutation,
    useGetMeetingsQuery,
    useGetMeetingQuery,
    useGetParticpantsQuery,
    useGetCoursesQuery,
    useGetCriteriasQuery,
    useGetPresentorsQuery,
    useGetAccountQuery,
    useGetPitchQuery
} = apiSlice;

export const selectApi = (state) => state.api;