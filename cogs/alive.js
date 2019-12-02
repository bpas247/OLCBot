"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cog_1 = __importDefault(require("./cog"));
const startDate = new Date();
exports.calculateTimeDist = (startDate, endDate) => {
    const out = [];
    let difference = Math.abs(Number(startDate) - Number(endDate));
    out.push(Math.floor(difference / (1000 * 60 * 60 * 24)));
    difference -= out[0] * 1000 * 60 * 60 * 24;
    out.push(Math.floor(difference / (1000 * 60 * 60)));
    difference -= out[1] * 1000 * 60 * 60;
    out.push(Math.floor(difference / (1000 * 60)));
    difference -= out[2] * 1000 * 60;
    out.push(Math.floor(difference / 1000));
    return out;
};
exports.alive = (startDate, endDate) => {
    const timeDist = exports.calculateTimeDist(startDate, endDate);
    const labels = ["days", "hours", "minutes", "seconds"];
    let out = "I have been alive for: \n";
    for (let i = 0; i < labels.length; i++) {
        out += timeDist[i] + " " + labels[i];
        if (i !== labels.length - 1) {
            out += ", ";
        }
    }
    return out;
};
const AliveCog = new cog_1.default("alive", () => exports.alive(startDate, new Date()), "How long have I been alive for?");
exports.default = AliveCog;
