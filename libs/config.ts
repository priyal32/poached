type Config = {
  url: string;
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
  };

  return config;
};

export default config(process.env);
