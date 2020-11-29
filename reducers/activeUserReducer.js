const activeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'USER_LOGOUT':
      return action.data
    default:
      return state
  }
}

export const setUser = data => {
  return {
    type: 'SET_USER',
    data
  }
}
export const clearUser = () => {
  return {
    type: 'USER_LOGOUT',
    data: null
  }
}

export default activeUserReducer