export const isRootModalVisible = (state) => state.showModal;

export const subMenu = (state) => state.subMenu;

export const announcements = (state) => state.announcements.announcements;
export const new_announcements = (state) =>
    state.announcements.new_announcements;
export const update_announcement = (state) =>
    state.announcements.announcement_to_update;

export const isEnabled = (state) => state.enabled;
