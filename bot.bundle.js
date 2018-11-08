!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){e.exports=require("discord.js")},function(e,t){e.exports=require("pg-promise")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.randomGrab=t.isValidDate=void 0;t.isValidDate=(e=>{var t=e.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(null!==t){var n=+t[1],a=+t[2],o=+t[3],r=new Date(o,n-1,a);return r.getFullYear()===o&&r.getMonth()===n-1}return!1});t.randomGrab=(e=>e[Math.floor(Math.random()*e.length)])},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateCount=t.default=void 0;n(0),n(1);t.default=(async(e,t,n,a)=>{if(-1!==t.indexOf("start")){let t;if(!e.hasPermission("ADMINISTRATOR"))return"You don't have the permissions for this command.";if(void 0!==(await a.any("SELECT month, day FROM meme_last_ran"))[0])t="Command has already ran, so nothing else will be done.";else{const e=new Date;try{await a.query("INSERT into meme_last_ran (month, day) VALUES($1, $2)",[e.getMonth(),e.getDate()])}catch(e){console.log(e),t="Something went wrong! yell at the dev!!!"}t="Sucessfully started!"}return t}if(-1!==t.indexOf("ls")){let e;try{e=await a.any("SELECT id, count FROM meme_count")}catch(e){return console.log(e),"Something went wrong, it probably wasn't started"}if(0==e.length)return"Nobodye has posted any memes yet :(";let t="List of everyone's scores:";for(let a of e){var o="undefined";for(let e of n)e.id==a.id&&(o=e);t+="undefined"!==o?"\n"+o.username+" - "+a.count:"\n"+o+" - "+a.count}return t}if(-1!==t.indexOf("lastRan")){let e=await a.any("SELECT month, day FROM meme_last_ran");return void 0==e[0]?"hasn't been ran before":"Last ran on "+(parseInt(e[0].month)+1)+"/"+e[0].day+"/2018"}if(-1!==t.indexOf("resetTime"))return e.hasPermission("ADMINISTRATOR")?(await a.query("DELETE FROM meme_last_ran"),"Successfully reset the time"):"You don't have the permissions for this command.";if(-1!==t.indexOf("resetCount"))return e.hasPermission("ADMINISTRATOR")?(await a.query("DELETE FROM meme_count"),"Successfully reset the count"):"You don't have the permissions for this command."});t.updateCount=(async(e,t,n)=>{let a;try{a=await n.any("SELECT count FROM meme_count WHERE id = $1",e)}catch(e){return console.log(e),"something went wrong"}return 0===a.length?(await n.query("INSERT into meme_count (id, count) VALUES($1, $2)",[e,t]),"Added new entry!"):(await n.query("UPDATE meme_count SET count = $1 WHERE id = $2",[a[0].count+t,e]),"Updated entry!")})},function(e,t){e.exports=require("dotenv")},function(e,t,n){"use strict";var a=function(e){return e&&e.__esModule?e:{default:e}}(n(0)),o=n(6);n(4).config();const r=new a.default.Client;r.on("ready",async()=>{console.log(`Bot has started, with ${r.users.size} users, in ${r.channels.size} channels of ${r.guilds.size} guilds.`),r.user.setActivity("Type !help for more info"),await(0,o.onCreate)()},e=>{e&&console.log(e)}),r.on("message",async e=>{await(0,o.onMessage)(r,e)},e=>{e&&console.log(e)}),r.login(process.env.TOKEN).catch(e=>{console.log(e)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.onMessage=t.onCreate=t.db=void 0;n(0);var a=function(e){return e&&e.__esModule?e:{default:e}}(n(7)),o=n(3);n(4).config();const r=n(1)();r.pg.defaults.ssl=!0;const i=r(process.env.DATABASE_URL);t.db=i;var s;t.onCreate=(async()=>{s=new Date,await i.query("CREATE TABLE IF NOT EXISTS birthday (id text, date text)"),await i.query("CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)"),await i.query("CREATE TABLE IF NOT EXISTS meme_count (id text, count int)"),console.log("All database tables are ready!")});t.onMessage=(async(e,t)=>{if(!t.author.bot)if(0!==t.content.indexOf("!")){let e;try{e=await t.awaitReactions((e,t)=>!0,{time:3e5}),await(0,o.updateCount)(t.author.id,e.size,i)}catch(e){console.log(e)}}else await(async(e,t)=>{if(0!==t.content.indexOf("!"))return;const n=t.content.slice("!".length).trim().split(/ +/g),o=n.shift().toLowerCase();let r="Could not recognize command",d=a.default.get(o);void 0!==(r=void 0!==d?"alive"==o?d(t,n,s):"birthday"==o?await d(t,n,e.users.array(),i):"memes"==o?await d(t,n,e.users.array(),i):await d(t,n):"Command not recognized.")&&t.channel.send(r)})(e,t)})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=d(n(8)),o=n(9),r=n(2),i=d(n(10)),s=d(n(3));function d(e){return e&&e.__esModule?e:{default:e}}var u=new Map([["ping",()=>"Pong!"],["say",(e,t)=>{const n=t.join(" ");return e.delete().catch(e=>{}),n}],["complain",()=>(0,r.randomGrab)(o.complain)],["do",()=>(0,r.randomGrab)(o.sassy)],["motivate",()=>(0,r.randomGrab)(o.motivate)],["alive",(e,t,n)=>(0,i.default)(n,new Date)],["help",()=>o.help],["birthday",async(e,t,n,o)=>await(0,a.default)(e.author.id,t,n,o)],["memes",async(e,t,n,a)=>{let o=await e.guild.fetchMember(e.author);return await(0,s.default)(o,t,n,a)}]]);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDateFromArgs=t.default=void 0;n(0),n(1);var a=n(2);t.default=(async(e,t,n,a)=>{if(-1!=t.indexOf("add")){const n=r(t);if(void 0!==n){const t=await a.any("SELECT id, date FROM birthday");return await i(e,n,t,a)}return"You didn't enter a valid date"}if(-1!=t.indexOf("ls")){const e=await a.any("SELECT id, date FROM birthday");return s(e,n)}return"Command for birthday could not be found"});const o=(e,t)=>{var n="undefined";for(let a of t)a.id==e&&(n=a);return n},r=e=>{var t=void 0;for(let n=0;n<e.length;n++)(0,a.isValidDate)(e[n])&&(t=e[n]);return t};t.getDateFromArgs=r;const i=async(e,t,n,a)=>((e,t)=>{var n=!1;for(let a of t)a.id==e&&(n=!0);return n})(e,n)?((e,t,n)=>{var a=!1;for(let o of n)o.id==e&&o.date==t&&(a=!0);return a})(e,t,n)?"Name and date already in the database, so I'm not gonna re-add it.":(await a.query("UPDATE birthday SET date = $1 WHERE id = $2",[t,e]),"Updated entry!"):(await a.query("INSERT into birthday (id, date) VALUES($1, $2)",[e,t]),"Added new entry!"),s=(e,t)=>{var n="List of everyone's birthday goes as follows:";for(let r of e){var a=o(r.id,t);if("undefined"!==a)n+="\n"+a.username+" - "+r.date;else n+="\n"+a+" - "+r.date}return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.help=t.complain=t.sassy=t.motivate=void 0;t.motivate=["students who visit the Bock Learning Center have improved grades","a student has successfully understood the concept you explained","a student has signed in successfully","a student has pushed in their chair as they left","there are no students left in the center at closing time"];t.sassy=["no.","Let me get back to you on that :information_desk_person:","Here's a suggestion: how about you do it?","Could you ask for nothing? I'll be able to do nothing."];t.complain=["Why doesn't anyone use introductory sentences?","I'm not a style guide!","Just google it!!","TOO MUCH PERSONAL INFORMATION—MY EYES ARE BLEEDING","Why is it so cold in here?","Whyyy is it so hot in here???","Did you remember to sign in?","I rephrased this question 27 times and drew 4 visuals.","Why is there a banana here?","Don't forget the '+ c'."];t.help="!ping - Tests to see if the bot is working\n!say - Tell the bot to say something\n!do - Tell the bot to do something\n!complain - Generate a random complaint\n!motivate - Generate a random motivation\n!alive - How long have I been alive for?\n!birthday add MM/DD/YYYY - add a birthday to the list\n!birthday ls - list everyone's birthday\n!memes ls - list the scoreboard for everyone's meme count"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.calculateTimeDist=void 0;const a=(e,t)=>{var n=[],a=Math.abs(e-t);return n.push(Math.floor(a/864e5)),a-=1e3*n[0]*60*60*24,n.push(Math.floor(a/36e5)),a-=1e3*n[1]*60*60,n.push(Math.floor(a/6e4)),a-=1e3*n[2]*60,n.push(Math.floor(a/1e3)),n};t.calculateTimeDist=a;t.default=((e,t)=>{const n=a(e,t),o=["days","hours","minutes","seconds"];for(var r="I have been alive for: \n",i=0;i<o.length;i++)r+=n[i]+" "+o[i],i!==o.length-1&&(r+=", ");return r})}]);