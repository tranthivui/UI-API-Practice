import { ENV } from "../config/env";
import { User } from "../types/NewUser";


export const listUser = {
    invalidPass: { email: ENV.userEmail, password: "UJ25631464" }
} satisfies Record<string, User>;
