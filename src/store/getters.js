const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  currentCollege: state => state.user.currentCollege,
  tenantId: state => state.user.currentCollege.tenantId,
  organizationId: state => state.user.currentCollege.organizationId,
  visitedViews: state => state.tagsView.visitedViews,
  menuType: state => state.menuType,
  opened: state => {
    if (state.opened === 'false') {
      return false
    } else if (state.opened === 'true') {
      return true
    }
  },
}
export default getters
