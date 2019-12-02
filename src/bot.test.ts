import { onCreate, onCommand } from "./bot";
import sinon from "sinon";
import createDb, { cleanup } from "./test/dbMock";
import { IDatabase, IMain } from "pg-promise";
import pgPromise from "pg-promise";

describe("bot", () => {
	let db: IDatabase<any>;
	let pgp: IMain;

	beforeAll(() => {
		pgp = pgPromise();
		db = createDb(pgp);
	});
	beforeEach(async () => cleanup(db));
	afterAll(() => pgp.end());

	describe("onCreate", () => {
		it("should not throw an error on create", async () => {
			await onCreate(db);
		});
	});

	describe("onCommand", () => {
		let messageMock: any;

		beforeEach(() => {
			messageMock = {
				content: "!ping",
				channel: {
					send: sinon.spy()
				}
			};
		});

		it("should make sure it can resolve a simple command", async () => {
			await onCommand(messageMock, db);
			expect(messageMock.channel.send.calledWith("Pong!")).toBeTruthy();
		});

		it("should not send a message to a channel if the prefix is invalid", async () => {
			messageMock.content = ">poing";
			await onCommand(messageMock, db);
			expect(messageMock.channel.send.callCount).toEqual(0);
		});

		it("should reply with an unrecognized command if passed in an invalid command", async () => {
			messageMock.content = "!poing";
			await onCommand(messageMock, db);
			expect(
				messageMock.channel.send.calledWith(
					"Command not recognized: Base Cog undefined"
				)
			).toBeTruthy();
		});
	});
});
