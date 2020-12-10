import axios from 'axios';

const baseUrl = 'https://fern-counseling.herokuapp.com/api/users';

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
export default { registerUser, getAllUsers, createAvatar };
