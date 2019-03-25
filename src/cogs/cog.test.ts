import cogs from "./cog";
import { complain, sassy, motivate, help } from "./messages";

it("Successfully pings", () => {
  var test: Function | undefined = cogs.get("ping");
  expect(test).toBeDefined();
  if (test !== undefined) expect(test()).toBe("Pong!");
});

it("Successfully says what was given", () => {
  let says: string = "This is what I'm saying";

  let toArray: Array<string> = says.split(" ");

  let call: string = "say ";

  toArray.forEach((element, i) => {
    call += element;
    if (i < toArray.length - 1) call += " ";
  });

  let returnFunc = cogs.get("say");
  expect(returnFunc).toBeDefined();
  if (returnFunc)
    expect(returnFunc({ delete: () => Promise.resolve() }, toArray)).toBe(says);
});

it("Sucessfully grabs a complaint", () => {
  var test = cogs.get("complain");
  expect(test).toBeDefined();
  if (test !== undefined) {
    var out: string = test();
    expect(foundInArray(out, complain)).toBe(true);
  }
});

it("Sucessfully grabs a sass", () => {
  var test = cogs.get("do");
  expect(test).toBeDefined();
  if (test !== undefined) {
    var out = test();
    expect(foundInArray(out, sassy)).toBe(true);
  }
});

it("Sucessfully grabs a motivation", () => {
  var test = cogs.get("motivate");
  expect(test).toBeDefined();
  if (test !== undefined) {
    var out = test();
    expect(foundInArray(out, motivate)).toBe(true);
  }
});

it("Successfully returns a help message", () => {
  let returnFunc = cogs.get("help");
  expect(returnFunc).toBeDefined();
  if (returnFunc) expect(returnFunc()).toBeDefined();
});

it("Successfully returns the correct time", () => {
  let test = cogs.get("alive");
  expect(test).toBeDefined();

  if (test !== undefined) {
    expect(test("", [], new Date())).toBeDefined();
  }
});

function foundInArray(toFind: string, arr: Array<string>) {
  let out = false;
  arr.forEach(element => {
    if (toFind === element) out = true;
  });

  return out;
}
