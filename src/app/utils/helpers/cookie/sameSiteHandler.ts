export const sameSiteHandler = () => {
  return process.env.NODE_ENV === "production" ? "none" : "lax";
};
