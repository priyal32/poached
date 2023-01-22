type Config = {
  is_production: boolean;
  enable_admin: boolean;
  url: string;
  repo_url: string;
  github_access_token: string;
  repo_api_url: string;
  google_client_id: string;
  google_client_secret: string;
  credential_auth: boolean;
  nextauth_secret: string;
};

type EnvironmentValue = string | undefined;
type Environment = { [key: string]: EnvironmentValue };

export const config = (env: Environment): Config => {
  const stringToBoolean = (str: EnvironmentValue): boolean => {
    if (str === "true" || str === "1") {
      return true;
    } else if (str === "false" || str === "0") {
      return false;
    } else {
      return Boolean(str);
    }
  };

  // const throwIfUndefined = (key: keyof Environment): string => {
  //   const value = env[key];
  //   console.log(value);
  //   if (value === undefined) {
  //     throw new Error(`Missing environment variable: ${key}`);
  //   }

  //   return value;
  // };

  const validNodeEnvs = (str: EnvironmentValue) => {
    const valid = ["development", "production", "test"];
    if (str && !valid.includes(str)) {
      throw new Error(`Invalid NODE_ENV set: ${str}`);
    } else if (!str) {
      console.warn("No NODE_ENV specified, defaulting to development");
    } else {
      console.log(`Using NODE_ENV: ${str}`);
    }
  };

  const is_production = env.NODE_ENV === "production";

  validNodeEnvs(env.NODE_ENV);

  const config: Config = {
    is_production,
    url: is_production ? "https://poached.vercel.app" : "http://localhost:3000",
    repo_url: env.REPO_URL ?? "",
    repo_api_url: env.REPO_STATS ?? "",
    github_access_token: env.GITHUB_ACCESS_TOKEN ?? "",
    google_client_id: env.GOOGLE_CLIENT_ID ?? "",
    google_client_secret: env.GOOGLE_CLIENT_SECRET ?? "",
    credential_auth: stringToBoolean("CREDENTIAL_AUTH") ?? true,
    nextauth_secret: env.NEXTAUTH_SECRET ?? "",
    enable_admin: stringToBoolean("ENABLE_ADMIN"),
  };

  return config;
};

export default config(process.env);
