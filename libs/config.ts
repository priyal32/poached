type Config = {
  url: string;
  repo_url: string;
  github_access_token: string;
  repo_api_url: string;
};

type EnvironmentValue = string | undefined;
type Environment = { [key: string]: EnvironmentValue };

export const config = (env: Environment): Config => {
  //   const throwIfUndefined = (key: keyof Environment): string => {
  //     const value = env[key];
  //     if (value === undefined) {
  //       throw new Error(`Missing environment variable: ${key}`);
  //     }

  //     return value;
  //   };

  const is_production = env.NODE_ENV === "production";

  const config: Config = {
    url: is_production ? "https://poached.vercel.app" : "http://localhost:3000",
    repo_url: env.REPO_URL ?? "",
    repo_api_url: env.REPO_STATS ?? "",
    github_access_token: env.GITHUB_ACCESS_TOKEN ?? "",
  };

  return config;
};

export default config(process.env);
