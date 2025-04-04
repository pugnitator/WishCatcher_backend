export const filterUserData = (user) => {
  const { _id, login, name, birthday, friends } = user;
  return { id: _id, login, name, birthday, friends };
};
