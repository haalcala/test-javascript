import React, { useEffect, useState } from "react";
import clsx from "clsx";

import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import {
    AppBar,
    Avatar,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import AnnouncementList from "./AnnouncementList";
import NewAnnouncement from "./NewAnnouncement";

const drawerWidth = 240;

const Root = (props) => {
    const {
        visible,
        close,
        theme,
        subMenu,
        serverVersion,
        openRootModal,
        announcements,
        fetchAnnouncements,
        announcement_to_update,
    } = props;
    console.log(
        "announcements::",
        announcements,
        "announcement_to_update:",
        announcement_to_update
    );

    const style = getStyle(theme);

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            maxWidth: "36ch",
            backgroundColor: theme.palette.background.paper,
            flexGrow: 1,
        },
        inline: {
            display: "inline",
        },
        // root: {
        //     flexGrow: 1,
        //   },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        hide: {
            display: "none",
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: "flex-end",
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }));

    const classes = useStyles();

    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("ROOT COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----");

    const [state, setState] = useState({
        serverVersionOnAppLoad: serverVersion,
    });

    // useEffect(() => {
    //     fetchAnnouncements();
    //     return () => {};
    // }, []);

    // if (
    //     !visible &&
    //     !equalServerVersions(state.serverVersionOnAppLoad, serverVersion)
    // ) {
    //     openRootModal();
    // }

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [selected, setSelected] = useState("list");

    openRootModal();

    if (!visible) {
        return null;
    }

    let extraContent = "";
    let extraContentTitle = "";

    if (subMenu) {
        extraContentTitle = (
            <FormattedMessage
                id="demo.triggeredby"
                defaultMessage="Element clicked in the menu: "
            />
        );

        extraContent = subMenu;
    }

    let list_item_count = 0;

    const listItems = (
        <List className={classes.root}>
            {announcements.map((announcement) => (
                <div id={list_item_count++} style={{ fontSize: "2em" }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt={announcement.sender_name}
                                src="/static/images/avatar/1.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={announcement.message_title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {announcement.message_body}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );

    const components = {
        new: {
            title: "New Announcement",
            component: <NewAnnouncement {...props} classes={classes} />,
        },
        update: {
            title: "Update Announcement",
            component: <NewAnnouncement {...props} classes={classes} />,
        },
        list: {
            title: "List Announcements",
            component: <AnnouncementList {...props} classes={classes} />,
        },
    };

    const component = announcement_to_update
        ? components["update"]
        : components[selected];

    console.log(
        "component:",
        component,
        "announcement_to_update:",
        announcement_to_update,
        "selected:",
        selected
    );

    return (
        <div
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
            style={{ minHeight: "300px", border: "1px solid blue" }}
        >
            <React.Fragment>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {component.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            onClick={() => {
                                setSelected("new");
                                setOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Announcement" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setSelected("list");
                                setOpen(false);
                            }}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="List Announcements" />
                        </ListItem>
                    </List>
                </Drawer>
                <div className={classes.drawerHeader} />
                <Container style={{ padding: "1em" }}>
                    {component.component}
                </Container>
            </React.Fragment>
        </div>
    );
};

Root.propTypes = {
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    subMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const getStyle = (theme) => ({
    backdrop: {
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        zIndex: 2000,
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        height: "250px",
        width: "400px",
        padding: "1em",
        color: theme.centerChannelColor,
        backgroundColor: theme.centerChannelBg,
    },
});

export default Root;
