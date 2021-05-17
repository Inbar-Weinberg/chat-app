export const signInWithExternalAuthCallback = async ({
  externalService,
  firebase,
  Auth,
  history,
}) => {
  const provider = new firebase.auth[`${externalService}AuthProvider`]();
  await Auth.signInWithPopup(provider);
  history.push("/");
};
