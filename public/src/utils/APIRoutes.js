const host = `http://localhost:${process.env.REACT_APP_PORT}`;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/addMessage`;
export const getMessagesRoute = `${host}/api/messages/getMessages`;
