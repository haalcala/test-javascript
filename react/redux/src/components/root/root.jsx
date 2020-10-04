import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";

const Root = ({
    visible,
    close,
    theme,
    subMenu,
    serverVersion,
    openRootModal,
    announcements,
    fetchAnnouncements,
}) => {
    console.log("announcements::", announcements);
    const style = getStyle(theme);

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            maxWidth: "36ch",
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: "inline",
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

    return (
        <div style={style.backdrop} onClick={close}>
            <div style={style.modal}>
                {/* <React.Fragment>
                    <FormattedMessage
                        id="version_bar.new"
                        defaultMessage="A new version of Mattermost is available."
                    />
                    <br />
                    <br />
                    <a onClick={() => window.location.reload()}>
                        <FormattedMessage
                            id="version_bar.refresh"
                            defaultMessage="Refresh the app now"
                        />
                    </a>
                    {"."}
                </React.Fragment> */}
                {listItems}
            </div>
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
