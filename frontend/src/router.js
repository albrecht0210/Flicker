import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import MeetingPage from "./features/meetings/MeetingPage";
// import MeetingDetailsPage from "./features/meetingdetails/MeetingDetailsPage";
// import VideoPage from "./features/video/VideoPage";
import NotAuthenticatedLayout from "./layouts/NotAuthenticatedLayout";
import LoginPage from "./features/login/LoginPage";
import MeetingPage from "./features/meetings/MeetingPage";
import MeetingDetailsPage from "./features/meetingdetails/MeetingDetailsPage";
import VideoPage from "./features/video/VideoPage";

function UrlPaths() {

    // const routesForAuthenticatedOnly = [
    //     {
    //         path: "/",
    //         element: <AuthenticatedLayout />,
    //         children: [
    //             // {
    //             //     path: "",
    //             //     element: <DashboardPage />
    //             // },
    //             {
    //                 path: "meetings",
    //                 element: "",//layout,
    //                 children: [
    //                     {
    //                         path: "",
    //                         element: <MeetingPage />
    //                     },
    //                     {
    //                         path: ":meetingName",
    //                         element: <MeetingDetailsPage />
    //                     },
    //                 ]
    //             },
    //             {
    //                 path: "video_meeting",
    //                 element: <VideoPage />
    //             }
    //         ]
    //     }
    // ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <NotAuthenticatedLayout />,
            children: [
                {
                    path: "",
                    element: <LoginPage />,
                }
            ]
        }
    ];

    const router = createBrowserRouter([
        // ...(!token ? routesForNotAuthenticatedOnly : []),
        // ...routesForAuthenticatedOnly,
        ...routesForNotAuthenticatedOnly
    ]);

    return <RouterProvider router={router} />;
}

export default UrlPaths;