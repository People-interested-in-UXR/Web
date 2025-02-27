export const isEnvTrue = ({ env }: { env: string | undefined }) => {
  return env === "true" ? true : false;
};
