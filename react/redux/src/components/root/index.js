import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    announcements,
    isRootModalVisible,
    new_announcements,
    subMenu,
} from "../../selectors";
import {
    closeRootModal,
    fetchAnnouncements,
    openRootModal,
} from "../../actions";

import Root from "./root";

const mapStateToProps = (state) => ({
    visible: isRootModalVisible(state),
    subMenu: subMenu(state),
    serverVersion: state.entities && state.entities.general.serverVersion,
    openRootModal,
    theme: {},
    announcements: announcements(state),
    new_announcements: new_announcements(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            close: closeRootModal,
            openRootModal,
            fetchAnnouncements,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Root);
