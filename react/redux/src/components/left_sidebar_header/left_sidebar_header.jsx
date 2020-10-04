import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Alert, AlertTitle } from "@material-ui/lab";
import Carousel from "react-material-ui-carousel";
import { Button, Divider, Paper, withStyles } from "@material-ui/core";

const styles = {
    main: {
        margin: ".5em 0 .5em",
        padding: "0 12px 0 15px",
        // color: "rgba(255,255,255,0.6)",
    },
    iconStyle: {
        display: "inline-block",
        margin: "0 7px 0 1px",
    },
    main_unread: {
        margin: ".5em 0 .5em",
        padding: "0 12px 0 15px",
        fontWeight: "bold",
    },
    button: {
        fontSize: ".8rem",
        color: "blue",
        "&:hover": {
            textDecoration: "underline",
        },
    },
};
// LeftSidebarHeader is a pure component, later connected to the Redux store so as to
// show the plugin's enabled / disabled status.
const LeftSidebarHeader = (props) => {
    const {
        openRootModal,
        isRootModalVisible,
        enabled,
        announcements,
        new_announcements,
        classes,
    } = props;

    return (
        <div
            className={
                classes[
                    "main" + (new_announcements.length > 0 ? "_unread" : "")
                ]
            }
            onClick={openRootModal}
        >
            {/* <i className="icon fa fa-plug" style={iconStyle} />
            <FormattedMessage
                id="sidebar.demo"
                defaultMessage="Demo Plugin:"
            />{" "}
            {enabled ? (
                <span>
                    <FormattedMessage
                        id="sidebar.enabled"
                        defaultMessage="Enabled"
                    />
                </span>
            ) : (
                <span>
                    <FormattedMessage
                        id="sidebar.disabled"
                        defaultMessage="Disabled"
                    />
                </span>
            )} */}
            V-CUBE Annoucements (
            {(new_announcements && new_announcements.length) || 0}/
            {(announcements && announcements.length) || 0})<br />
            {(new_announcements && new_announcements.length) || 0 > 0 ? (
                <Carousel>
                    {new_announcements.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </Carousel>
            ) : (
                ""
            )}
            <Divider />
            <div>
                <div className={classes.button} style={{ float: "left" }}>
                    See All
                </div>
                <div className={classes.button} style={{ float: "right" }}>
                    New Announcement
                </div>
            </div>
        </div>
    );
};

function Item(props) {
    return (
        <Paper>
            <h2>{props.item.message_title}</h2>
            <p>{props.item.message_body}</p>

            <Button className="CheckButton">Check it out!</Button>
        </Paper>
    );
}

LeftSidebarHeader.propTypes = {
    enabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LeftSidebarHeader);
