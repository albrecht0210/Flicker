import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// devvariable
meetingStatus = ["pending", "in_progress", "completed"];


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_WILDCAT_SERVER_HOST,
        
    }),
    endpoints: (builder) => ({
        // Wildcat Server
        authenticate: builder.mutation({
            query: (credentials) => ({
                url: `${process.env.REACT_APP_WILDCAT_SERVER_HOST}token/`,
                method: 'POST',
                body: credentials
            }),
        }),
        // deauthenticate: builder.mutation({
        //     query: () => ({
        //         url: 'users/logout/',
        //         method: 'POST'
        //     }),
        // }),
        // Flicker Server
        getMeetings: builder.query({
            query: (courseId) => `${process.env.REACT_APP_FLICKER_HOST}meetings/?course=${courseId}&status=${localStorage.getItem('meetingStatus') ? meetingStatus[localStorage.getItem('meetingStatus')] : meetingStatus[0]}`,
            headers: (headers) => {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }
                return headers;
            }
        }),
        getMeeting: builder.query({
            query: (meetingId) => `${process.env.REACT_APP_FLICKER_HOST}meetings/${meetingId}`,
            headers: (headers) => {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }
                return headers;
            }
        }),
        getParticpants: builder.query({
            query: (courseId) => `${process.env.REACT_APP_TEAM_MANAGEMENT_HOST}courses/${courseId}/get_members/`,
            headers: (headers) => {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }
                return headers;
            }
        }),
        getCourses: builder.query({
            query: () => `${process.env.REACT_APP_TEAM_MANAGEMENT_HOST}courses/account/`,
            headers: (headers) => {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }
                return headers;
            }
        }),
        getCriterias: builder.query({
            query: (meetingId) => `${process.env.REACT_APP_FLICKER_HOST}meetings/${meetingId}/get_criterias/`,
            headers: (headers) => {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }
                return headers;
            }
        }),
        getPresentors: builder.query({
            query: (meetingId) => `${process.env.REACT_APP_FLICKER_HOST}meetings/${meetingId}/get_presentors/`,
            headers: (headers) => {
                const token = localStorage.getItem('accessToken')
                if (token) {
                    headers.append('Authorization', `Bearer ${token}`);
                }
                return headers;
            }
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
} = apiSlice;
