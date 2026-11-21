import { ConduitUser } from "../../types/conduiTypes/NewUser";

type RegisterErrorCase = {
    name: string;
    user: ConduitUser;
    status: number;
    field: string;      
    message: string;    
};

const id=Date.now();

export const registerErrorCases = [
    { name: "username blank", user: 
        { username: "", email: `e-${id}@example.com`, password: "PassTest@123" },
      status: 422, field: "username", message: "can't be blank" },
      { name: "invalid email", user: 
        { username: `u-${id}`, email: `e-${id}`, password: "PassTest@123" },
      status: 422, field: "email", message: "is invalid" },
      { name: "password blank", user: 
        { username: "u-${id}", email: `e-${id}@example.com`, password: "" },
      status: 422, field: "password", message:  "can't be blank" },
] satisfies RegisterErrorCase[];