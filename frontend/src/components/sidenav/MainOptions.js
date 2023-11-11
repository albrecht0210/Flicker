import { CircularProgress, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCoursesQuery } from "../../features/api/apiSlice";
import { storeCourse } from "../../features/meetings/meetingSlice";
import { formatStringToUrl } from "../../utils/helper";

let CourseData = ({ course }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCourseClick = (course) => {
        dispatch(storeCourse({selectedCourse: course.id}));
        localStorage.setItem("selectedCourse", course.id);
        navigate(`/meetings/${formatStringToUrl(course.name)}`);
    }

    return (
        <ListItem key={course.id} disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleCourseClick(course)}>
                <ListItemText primary={course.name} primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItemButton>
        </ListItem>
    );
}

function MainOptions() {
    const {
        data: courses = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCoursesQuery();

    const fetchedCourses = useMemo(() => {
        const fetchedCourses = courses.slice();
        return fetchedCourses;
    }, [courses]);

    const [expandOption, setExpandOption] = useState(true);
    const navigate = useNavigate();

    const handleCourseOptionClick = () => {
        setExpandOption(!expandOption);
    }
    
    const handleDashboardClick = () => {
        navigate("/");
    }
    
    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        const renderedCourses = fetchedCourses.map((course) => (
            <CourseData key={course.id} course={course} />
        ));

        content = renderedCourses;
    } else if (isError) {
        content = (
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary={error.toString()} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                </ListItemButton>
            </ListItem>
        );
    }


    return (
        <List
            subheader={
                <ListSubheader component={"div"}>
                    Main
                </ListSubheader>
            }
        >
            <ListItem disablePadding>
                <ListItemButton onClick={handleDashboardClick}>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={handleCourseOptionClick}>
                    <ListItemText primary="Courses" />
                    { expandOption ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
            </ListItem>
            <Collapse in={expandOption}>
                <List component="div" disablePadding>
                    {content}
                </List>
            </Collapse>
        </List>
    );
}

export default MainOptions;