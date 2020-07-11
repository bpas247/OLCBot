import { IDatabase, IMain } from "pg-promise";
export declare const cleanup: (db: IDatabase<any>) => Promise<void>;
declare const _default: (pgp: IMain) => IDatabase<{}, import("pg-promise/typescript/pg-subset").IClient>;
export default _default;
