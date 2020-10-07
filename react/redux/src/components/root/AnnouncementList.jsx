import React, { useEffect, useState } from "react";

import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as UpdateIcon } from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function (props) {
    const {
        announcements,
        classes,
        deleteAnnouncement,
        showAnnouncementForUpdate,
    } = props;

    const announcement_list = announcements.map((announcement) => (
        <StyledTableRow key={announcement.id}>
            <StyledTableCell component="th" scope="row">
                {announcement.id}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                {announcement.message_title}
            </StyledTableCell>
            <StyledTableCell align="left">
                {announcement.message_body}
            </StyledTableCell>
            <StyledTableCell align="left">
                {announcement.created}
            </StyledTableCell>
            <StyledTableCell align="left">
                {announcement.validity}
            </StyledTableCell>
            <StyledTableCell align="left" style={{ whiteSpace: "nowrap" }}>
                <DeleteIcon
                    onClick={() => deleteAnnouncement(announcement.id)}
                />
                <UpdateIcon
                    onClick={() => showAnnouncementForUpdate(announcement.id)}
                />
            </StyledTableCell>
        </StyledTableRow>
    ));
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="left">
                                Message
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                Created
                            </StyledTableCell>{" "}
                            <StyledTableCell align="left">
                                Valid Until
                            </StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{announcement_list}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
