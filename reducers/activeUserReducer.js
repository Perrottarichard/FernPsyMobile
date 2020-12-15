import { ToastAndroid } from 'react-native';
import userService from '../services/userService'

const activeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'USER_LOGOUT':
      return action.data;
    case 'UPDATE_AVATAR':
      return {...state, avatarProps: action.data.avatarProps, avatarName: action.data.avatarName}
    case 'UPDATE_USER':
      return {...state, ...action.data}
    case 'HEART_LOCK':
      return {...state, heartedPosts: [...state.heartedPosts, action.data]}
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
