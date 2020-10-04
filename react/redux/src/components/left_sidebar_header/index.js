import { connect } from "react-redux";

import {
    isRootModalVisible,
    isEnabled,
    announcements,
    new_announcements,
} from "../../selectors";
import { openRootModal } from "../../actions";

import LeftSidebarHeader from "./left_sidebar_header";

const mapStateToProps = (state) => ({
    enabled: isEnabled(state),
    isRootModalVisible: isRootModalVisible(state),
    announcements: announcements(state),
    new_announcements: new_announcements(state),
});

export default connect(mapStateToProps, { openRootModal })(LeftSidebarHeader);
