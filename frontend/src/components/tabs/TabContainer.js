import { Divider, Stack, Tab, Tabs } from "@mui/material";

function TabContainer(props) {
    const { selectedTab, handleTabChange, tabs, inputField } = props;

    return (
        <>
            <Stack direction="row">
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    { tabs.map((tabItem) => (
                        <Tab 
                            key={tabItem.value} 
                            label={tabItem.name[0].toUpperCase() + tabItem.name.slice(1)}
                            id={tabItem.name + '-tab'} 
                            aria-controls={tabItem.name + "-tabpanel"} 
                        />
                    )) }
                </Tabs>
                { inputField }
            </Stack>
            <Divider />
        </>
    );
}

TabContainer.defaultProps = {
    inputField: null,
}

export default TabContainer;