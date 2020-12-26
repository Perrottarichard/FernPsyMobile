import axios from 'axios';

const baseUrl = 'https://askfern.app/api/users';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const registerUser = async (user) => {
  const response = await axios.post(`${baseUrl}/register`, user);
  return response.data;
};
const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createAvatar = async (id, avatarProps, avatarName) => {
  const response = await axios.post(`${baseUrl}/createAvatar`, {id, avatarProps, avatarName})
  return response.data;
}
const recordMood = async (moodNum) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/addmood`, {mood: moodNum}, config)
  return response.data;
}
export default { registerUser, getAllUsers, createAvatar, recordMood, setToken };
