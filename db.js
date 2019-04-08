"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load up the database
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = pg_promise_1.default();
pgp.pg.defaults.ssl = true;
if (process.env.DATABASE_URL === undefined)
    throw new Error("you need to set the database URL");
exports.default = pgp(process.env.DATABASE_URL);
