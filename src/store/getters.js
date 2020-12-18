const getters = {
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
