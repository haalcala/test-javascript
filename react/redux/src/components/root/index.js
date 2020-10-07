import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    announcements,
    isRootModalVisible,
    new_announcements,
    subMenu,
    update_announcement,
} from "../../selectors";
import {
    closeRootModal,
    createAnnouncement,
    fetchAnnouncements,
    openRootModal,
    deleteAnnouncement,
    updateAnnouncement,
    showAnnouncementForUpdate,
} from "../../actions";

import Root from "./root";

const mapStateToProps = (state) => {
    console.log("root/index.js:: mapStateToProps: state:", state);
    return {
        visible: isRootModalVisible(state),
        subMenu: subMenu(state),
        serverVersion: state.entities && state.entities.general.serverVersion,
        theme: {},
        announcements: announcements(state),
        new_announcements: new_announcements(state),
        announcement_to_update: update_announcement(state),
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            close: closeRootModal,
            openRootModal,
            fetchAnnouncements,
            createAnnouncement,
            deleteAnnouncement,
            updateAnnouncement,
            showAnnouncementForUpdate,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Root);
