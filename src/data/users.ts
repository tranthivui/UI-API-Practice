import { ENV } from "../config/env";

export type User={
    email: string,
    password: string
};

export const listUser={
    invalidPass: {email: ENV.userEmail,password: "UJ25631464"}
} satisfies Record<string,User>