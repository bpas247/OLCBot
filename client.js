"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./bot"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
bot_1.default.login(process.env.TOKEN).catch((error) => {
    console.log(error);
});
