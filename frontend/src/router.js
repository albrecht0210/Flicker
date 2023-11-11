import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import MeetingPage from "./features/meetings/MeetingPage";
// import MeetingDetailsPage from "./features/meetingdetails/MeetingDetailsPage";
// import VideoPage from "./features/video/VideoPage";
import NotAuthenticatedLayout from "./layouts/NotAuthenticatedLayout";
import LoginPage from "./features/login/LoginPage";
import MeetingPage from "./features/meetings/MeetingPage";
import MeetingDetailsPage from "./features/meetingdetails/MeetingDetailsPage";
import { useSelector } from "react-redux";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import MeetingLayout from "./layouts/MeetingLayout";
import DetailLayout from "./layouts/DetailLayout";
import VideoPage from "./features/video/VideoPage";

function UrlPaths() {
    const { accessToken } = useSelector((state) => state.auth);
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <AuthenticatedLayout />,
            children: [
                {
                    path: "",
                    element: <DashboardPage />
                },
                {
                    path: "meetings",
                    element: <MeetingLayout />,
                    children: [
                        {
                            path: ":courseName",
                            element: <MeetingPage />
                        },
                    ]
                },
                {
                    path: "details",
                    element: <DetailLayout />,
                    children: [
                        {
                            path: ":meetingName",
                            element: <MeetingDetailsPage />
                        }
                    ]
                },
                {
                    path: "video_meeting",
                    element: <VideoPage />
                }
            ]
        }
    ];

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
        ...(!accessToken ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
}

export default UrlPaths;