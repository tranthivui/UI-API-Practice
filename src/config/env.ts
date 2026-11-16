import dotenv from "dotenv"

dotenv.config();

function requireEnv(name: string): string {
    const baseUrlValue = process.env[name];
    if (!baseUrlValue) {
        throw new Error(`Missing env: ${name}`);
    }
    return baseUrlValue;
}

export const ENV = {
    baseUrl: requireEnv("BASE_URL"),
    userEmail: requireEnv("USER_EMAIL"),
    userPassword: requireEnv("USER_PASSWORD"),
    userName: requireEnv("USER_NAME")
}


export const CONDUIT_ENV = {
    url: requireEnv("CONDUIT_URL"),
    apiUrl: `${requireEnv("CONDUIT_API_URL").replace(/\/$/, "")}/`,
    emailPrefix: requireEnv("CONDUIT_EMAIL_PREFIX"),
    password: requireEnv("CONDUIT_PASSWORD"),
}