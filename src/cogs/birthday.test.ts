import sinon, { SinonStub } from "sinon";
import {
	getDateFromArgs,
	isInDatabase,
	isDuplicateEntry,
	listUsers,
	updateEntry
} from "./birthday";
import BirthdayCog from "./birthday";
import createDb, { cleanup } from "../test/dbMock";
import { IDatabase, IMain } from "pg-promise";
import pgPromise from "pg-promise";

describe("birthday", () => {
	let db: IDatabase<any>;
	let pgp: IMain;

	beforeAll(() => {
		pgp = pgPromise();
		db = createDb(pgp);
	});
	beforeEach(async () => cleanup(db));
	afterAll(() => pgp.end());

	it("should list all birthdays", async () => {
		const anyStub: SinonStub = sinon.stub();
		const users: Array<object> = [
			{
				id: 12345,
				date: "01/01/2000",
				username: "testName"
			}
		];

		anyStub.returns(users);

		const message: any = {
			author: {
				id: 12345
			},
			client: {
				users: users
			}
		};
		await BirthdayCog.run(message, ["add", "01/01/2000"], db);
		const result = await BirthdayCog.run(message, ["ls"], db);

		// expect(db.any.calledOnce).toBeTruthy();
		expect(result).toEqual(
			"List of everyone's birthday goes as follows:\ntestName - 01/01/2000"
		);
	});

	describe("getDateFromArgs", () => {
		it("should get a valid date", () => {
			expect(getDateFromArgs(["01/01/2000"])).toBeDefined();
			expect(getDateFromArgs(["05/15/2004"])).toBeDefined();
		});

		it("should not get an invalid date", () => {
			expect(getDateFromArgs(["01/01/200"])).not.toBeDefined();
			expect(getDateFromArgs(["0250/15/204"])).not.toBeDefined();
		});
	});

	describe("isInDatabase", () => {
		it("should find the user in the array", () => {
			const testId = 2124588682;
			const testArray: Array<Record<string, any>> = [
				new Object({ id: testId })
			];
			expect(isInDatabase(testId, testArray)).toBeTruthy();
		});

		it("should not find the user in the array", () => {
			const testId = 2124588682;
			const testArray: Array<Record<string, any>> = [
				new Object({ id: testId + 25 })
			];
			expect(isInDatabase(testId, testArray)).toBeFalsy();
		});
	});

	describe("isDuplicateEntry", () => {
		it("should detect that there is a duplicate", () => {
			const testId = 2124588682;
			const testDate = "December 5, 1981";
			const testArray: Array<Record<string, any>> = [
				new Object({ id: testId, date: testDate })
			];
			expect(isDuplicateEntry(testId, testDate, testArray)).toBeTruthy();
		});

		it("should detect that there is not a duplicate", () => {
			const testId = 2124588682;
			const testDate = "December 5, 1981";
			const testArray: Array<Record<string, any>> = [
				new Object({ id: testId + 25, date: testDate })
			];
			expect(isDuplicateEntry(testId, testDate, testArray)).toBeFalsy();
		});
	});

	describe("listUsers", () => {
		it("should list current users", () => {
			const testId = 2124588682;
			const testDate = "December 5, 1981";
			const testArray: Array<Record<string, any>> = [
				new Object({ id: testId, date: testDate })
			];
			const findStub = sinon.stub();
			findStub.returns({
				username: testId,
				date: testDate
			});
			const users: any = {
				find: findStub
			};

			const returns = listUsers(testArray, users);
			expect(returns).toBe(
				`List of everyone's birthday goes as follows:\n${testId} - ${testDate}`
			);
		});

		it("Should not list a user not actively in the server", () => {
			const testId = 2124588682;
			const testDate = "December 5, 1981";
			const testArray: Array<Record<string, any>> = [
				new Object({ id: testId, date: testDate })
			];
			const findStub = sinon.stub();
			findStub.returns(undefined);
			const users: any = {
				find: findStub
			};

			const returns = listUsers(testArray, users);
			expect(returns).toBe("List of everyone's birthday goes as follows:");
		});
	});

	describe("updateEntry", () => {
		let testId: number;
		let testDate: string;
		let testArray: Array<Record<string, any>>;

		beforeEach(() => {
			testId = 2124588682;
			testDate = "December 5, 1981";
			testArray = [];
		});

		it("Should add a new entry", async () => {
			const returns = await updateEntry(testId, testDate, testArray, db);
			expect(returns).toEqual("Added new entry!");
		});

		it("Should update an existing entry", async () => {
			testArray = [new Object({ id: testId, date: "December 7, 1981" })];

			const returns = await updateEntry(testId, testDate, testArray, db);
			expect(returns).toEqual("Updated entry!");
		});

		it("Should not update the db if nothing changed", async () => {
			testArray = [new Object({ id: testId, date: testDate })];

			const returns = await updateEntry(testId, testDate, testArray, db);
			expect(returns).toEqual(
				"Name and date already in the database, so I'm not gonna re-add it."
			);
		});
	});
});
