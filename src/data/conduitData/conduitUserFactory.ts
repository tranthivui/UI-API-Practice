import { CONDUIT_ENV } from "../../config/env";
import { ConduitUser } from "../../types/conduiType/NewUser";

export function buildWorkerUser(workerIndex:number,suffix = ""): ConduitUser {
    const name=`${CONDUIT_ENV.emailPrefix}_w${workerIndex}${suffix}`;
    return {
        username: name, 
        email: `${name}@example.com`,
        password: CONDUIT_ENV.password,
    };
}