import { ToastAndroid } from 'react-native';
import userService from '../services/userService'

const activeUserReducer = (state = {user: null}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.data};
    case 'USER_LOGOUT':
      return {...state, user: action.data};
    case 'UPDATE_AVATAR':
      return {...state, user: {...state.user, avatarProps: action.data.avatarProps, avatarName: action.data.avatarName}}
    case 'UPDATE_USER':
      return {...state, user: action.data}
    case 'HEART_LOCK':
      console.log(state.user)
      return {...state, user: {...state.user, heartedPosts: state.user.heartedPosts.concat(action.data)}}
    default:
      return state;
  }
};

export const setUser = (data) => ({
  type: 'SET_USER',
  data,
});
export const clearUser = () => ({
  type: 'USER_LOGOUT',
  data: null,
});
export const heartLock = (postId) => ({
  type: 'HEART_LOCK',
  data: postId
})
export const updateUserAvatar = (id, avatarProps, avatarName) => async (dispatch) => {
try {
  const updated = await userService.createAvatar(id, avatarProps, avatarName);
  dispatch({
    type: 'UPDATE_AVATAR',
    data: {id: id, avatarProps: avatarProps, avatarName: avatarName}
  })
  dispatch({
    type: 'UPDATE_USER',
    data: updated
  })
  ToastAndroid.show('บันทึกสำเร็จ', ToastAndroid.SHORT)
} catch (error) {
  console.log(error)
  ToastAndroid.show('มีบางอย่างผิดพลาดกรุณาตรวจสอบ', ToastAndroid.SHORT)
}

}

export default activeUserReducer;
