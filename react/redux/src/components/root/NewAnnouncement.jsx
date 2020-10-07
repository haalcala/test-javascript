import React, { useState } from "react";
import { Button, Container } from "@material-ui/core";

export default function (props) {
    const {
        classes,
        createAnnouncement,
        announcement_to_update,
        updateAnnouncement,
    } = props;

    const [state, setState] = useState({
        id: (announcement_to_update && announcement_to_update.id) || "",
        message_title:
            (announcement_to_update && announcement_to_update.message_title) ||
            "",
        message_body:
            (announcement_to_update && announcement_to_update.message_body) ||
            "",
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("state:", state);

        if (!announcement_to_update) {
            createAnnouncement(state);
        } else {
            updateAnnouncement(state);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <div>
                        <input
                            type="text"
                            name="message_title"
                            placeholder="Title"
                            defaultValue={state.message_title}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label>Message</label>
                    <div>
                        <input
                            type="text"
                            name="message_body"
                            placeholder="Message"
                            defaultValue={state.message_body}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <Button type="submit" className={classes.button}>
                        {announcement_to_update ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Container>
    );
}
