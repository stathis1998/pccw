import { getEnvironmentVariable } from "../utils/enviroment";

interface JwtConfig {
  secret: string;
  expiresIn: string | number;
}

const jwtConfig: JwtConfig = {
  secret: getEnvironmentVariable("JWT_SECRET"),
  expiresIn: "1h",
};

export default jwtConfig;
