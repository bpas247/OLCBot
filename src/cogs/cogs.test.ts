import cogs from "./cogs";
import { complain, sassy, motivate } from "../util/messages";
import createDb, { cleanup } from "../test/dbMock";
import { IDatabase, IMain } from "pg-promise";
import pgPromise from "pg-promise";

const msg: any = { delete: () => Promise.resolve() };

const args: Array<string> = [];

function foundInArray(toFind: string, arr: Array<string>) {
	let out = false;
	arr.forEach((element) => {
		if (toFind === element) out = true;
	});

	return out;
}

describe("cogs", () => {
	let db: IDatabase<any>;
	let pgp: IMain;

	beforeAll(() => {
		pgp = pgPromise();
		db = createDb(pgp);
	});
	beforeEach(async () => cleanup(db));
	afterAll(() => pgp.end());

	it("Successfully pings", async () => {
		const test = cogs.get("ping");
		expect(test).toBeDefined();
		if (test) {
			expect(await test.run(msg, args, db)).toBe("Pong!");
		}
	});

	it("Successfully says what was given", async () => {
		const says = "This is what I'm saying";

		const toArray: Array<string> = says.split(" ");

		let call = "say ";

		toArray.forEach((element, i) => {
			call += element;
			if (i < toArray.length - 1) call += " ";
		});

		const returnCog = cogs.get("say");
		expect(returnCog).toBeDefined();
		if (returnCog) expect(await returnCog.run(msg, toArray, db)).toBe(says);
	});

	describe("random message commands", () => {
		const runTest = async (cmd: string, arr: Array<string>) => {
			const test = cogs.get(cmd);
			expect(test).toBeDefined();
			if (test !== undefined) {
				const out: any = await test.run(msg, args, db);
				expect(foundInArray(out, arr)).toBe(true);
			}
		};

		it("Sucessfully grabs a complaint", async () =>
			await runTest("complain", complain));
		it("Sucessfully grabs a sass", async () => await runTest("do", sassy));
		it("Sucessfully grabs a motivation", async () =>
			await runTest("motivate", motivate));
	});

	it("Successfully returns a help message", () => {
		const returnCog = cogs.get("help");
		expect(returnCog).toBeDefined();
		if (returnCog) expect(returnCog.run(msg, args, db)).toBeDefined();
	});

	it("Successfully returns the correct time", () => {
		const test = cogs.get("alive");
		expect(test).toBeDefined();

		if (test) {
			expect(test.run(msg, args, db)).toBeDefined();
		}
	});
});
