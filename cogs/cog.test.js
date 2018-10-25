const cogs = require("./cog.js").cogs;
const complain = require('./messages.js').complain;
const sass = require('./messages.js').sassy;
const motivate = require('./messages.js').motivate;
const help = require('./messages.js').help;

it("Successfully pings", () => {
    var test = cogs.get("ping");
    expect(test()).toBe("Pong!");
});

it("Sucessfully grabs a complaint", () => {
    var test = cogs.get("complain");
    var out = test();
    expect(foundInArray(out, complain)).toBe(true);
})

it("Sucessfully grabs a sass", () => {
    var test = cogs.get("do");
    var out = test();
    expect(foundInArray(out, sass)).toBe(true);
})

it("Sucessfully grabs a motivation", () => {
    var test = cogs.get("motivate");
    var out = test();
    expect(foundInArray(out, motivate)).toBe(true);
})

it("Successfully returns help", ()=> {
    var test = cogs.get("help");
    expect(test()).toBe(help);
});


function foundInArray(string, arr) {
    for(var i = 0; i < arr.length; i++) {
        if(string == arr[i]) {
            return true;
        }
    }
    return false;
} 