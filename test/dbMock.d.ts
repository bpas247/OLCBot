import { IDatabase, IMain } from "pg-promise";
export declare const cleanup: (db: IDatabase<any, import("pg-promise/typescript/pg-subset").IClient>) => Promise<void>;
declare const _default: (pgp: IMain<{}, import("pg-promise/typescript/pg-subset").IClient>) => IDatabase<{}, import("pg-promise/typescript/pg-subset").IClient>;
export default _default;
