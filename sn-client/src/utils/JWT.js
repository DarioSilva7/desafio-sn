export const decodeToken = (jwt) => {
  const [header, payload] = jwt
    .split(".")
    .slice(0, 2)
    .map((el) => el.replace(/-/g, "+").replace(/_/g, "/"))
    .map((el) => JSON.parse(window.atob(el)));
  return { header, payload };
};
