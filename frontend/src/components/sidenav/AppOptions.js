import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";

const application_links = [
    {
        name: "Account",
        to: "/account",
    },
    {
        name: "Settings",
        to: "/settings",
    },
]

function AppOptions() {
    return (
        <List
            subheader={
                <ListSubheader component={"div"}>
                    Application
                </ListSubheader>
            }
        >
            { application_links.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            )) }
        </List>
    );
}

export default AppOptions;