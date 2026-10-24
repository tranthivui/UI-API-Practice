import { ENV } from "../config/env";

export type User={
    username: string,
    password: string
};

export const listUser={
    invalidPass: {username: ENV.userEmail,password: "Mk135790"}
} satisfies Record<string,User>