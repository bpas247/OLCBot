!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("discord.js")},function(e,t,n){n(3),e.exports=n(5)},function(e,t){e.exports=require("@babel/polyfill")},function(e,t){e.exports=require("pg-promise")},function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=function(e){var t=e.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(null!==t){var n=+t[1],r=+t[2],a=+t[3],o=new Date(a,n-1,r);return o.getFullYear()===a&&o.getMonth()===n-1}return!1},u=function(e){return e[Math.floor(Math.random()*e.length)]},i=function(e,t){return t.find(function(t){return t.id==e})};function s(e,t,n,r,a,o,u){try{var i=e[o](u),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function u(e){s(o,r,a,u,i,"next",e)}function i(e){s(o,r,a,u,i,"throw",e)}u(void 0)})}}var f=function(){var e=c(regeneratorRuntime.mark(function e(t,n,r,a){var o,u,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(-1==n.indexOf("add")){e.next=14;break}if(void 0===(o=l(n))){e.next=11;break}return e.next=5,a.any("SELECT id, date FROM birthday");case 5:return u=e.sent,e.next=8,v(t,o,u,a);case 8:return e.abrupt("return",e.sent);case 11:return e.abrupt("return","You didn't enter a valid date");case 12:e.next=28;break;case 14:if(-1==n.indexOf("ls")){e.next=27;break}return e.prev=15,e.next=18,a.any("SELECT id, date FROM birthday");case 18:return i=e.sent,e.abrupt("return",m(i,r));case 22:e.prev=22,e.t0=e.catch(15),console.log(e.t0);case 25:e.next=28;break;case 27:return e.abrupt("return","Command for birthday could not be found");case 28:case"end":return e.stop()}},e,this,[[15,22]])}));return function(t,n,r,a){return e.apply(this,arguments)}}(),d=function(e,t){return t.find(function(t){return t.id==e})},l=function(e){for(var t=void 0,n=0;n<e.length;n++)o(e[n])&&(t=e[n]);return t},h=function(e,t){var n=!1,r=!0,a=!1,o=void 0;try{for(var u,i=t[Symbol.iterator]();!(r=(u=i.next()).done);r=!0){u.value.id==e&&(n=!0)}}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n},p=function(e,t,n){var r=!1,a=!0,o=!1,u=void 0;try{for(var i,s=n[Symbol.iterator]();!(a=(i=s.next()).done);a=!0){var c=i.value;c.id==e&&c.date==t&&(r=!0)}}catch(e){o=!0,u=e}finally{try{a||null==s.return||s.return()}finally{if(o)throw u}}return r},v=function(){var e=c(regeneratorRuntime.mark(function e(t,n,r,a){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(h(t,r)){e.next=6;break}return e.next=3,a.query("INSERT into birthday (id, date) VALUES($1, $2)",[t,n]);case 3:return e.abrupt("return","Added new entry!");case 6:if(p(t,n,r)){e.next=12;break}return e.next=9,a.query("UPDATE birthday SET date = $1 WHERE id = $2",[n,t]);case 9:return e.abrupt("return","Updated entry!");case 12:return e.abrupt("return","Name and date already in the database, so I'm not gonna re-add it.");case 13:case"end":return e.stop()}},e,this)}));return function(t,n,r,a){return e.apply(this,arguments)}}(),m=function(e,t){var n="List of everyone's birthday goes as follows:",r=!0,a=!1,o=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done);r=!0){var s=u.value,c=d(s.id,t);if(void 0!==c)n+="\n"+c.username+" - "+s.date;else n+="\n"+c+" - "+s.date}}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n},y=["students who visit the Bock Learning Center have improved grades","a student has successfully understood the concept you explained","a student has signed in successfully","a student has pushed in their chair as they left","there are no students left in the center at closing time"],b=["no.","Let me get back to you on that :information_desk_person:","Here's a suggestion: how about you do it?","Could you ask for nothing? I'll be able to do nothing."],x=["Why doesn't anyone use introductory sentences?","I'm not a style guide!","Just google it!!","TOO MUCH PERSONAL INFORMATION—MY EYES ARE BLEEDING","Why is it so cold in here?","Whyyy is it so hot in here???","Did you remember to sign in?","I rephrased this question 27 times and drew 4 visuals.","Why is there a banana here?","Don't forget the '+ c'."],g=function(e,t){for(var n=function(e,t){var n=[],r=Math.abs(Number(e)-Number(t));return n.push(Math.floor(r/864e5)),r-=1e3*n[0]*60*60*24,n.push(Math.floor(r/36e5)),r-=1e3*n[1]*60*60,n.push(Math.floor(r/6e4)),r-=1e3*n[2]*60,n.push(Math.floor(r/1e3)),n}(e,t),r=["days","hours","minutes","seconds"],a="I have been alive for: \n",o=0;o<r.length;o++)a+=n[o]+" "+r[o],o!==r.length-1&&(a+=", ");return a};function w(e,t,n,r,a,o,u){try{var i=e[o](u),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}function k(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function u(e){w(o,r,a,u,i,"next",e)}function i(e){w(o,r,a,u,i,"throw",e)}u(void 0)})}}var E=function(){var e=k(regeneratorRuntime.mark(function e(t,n,r,a){var o,u,s,c,f,d,l,h,p,v,m,y,b,x;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(-1===n.indexOf("start")){e.next=25;break}if(t.hasPermission("ADMINISTRATOR")){e.next=4;break}return e.abrupt("return","You don't have the permissions for this command.");case 4:return e.next=6,a.any("SELECT month, day FROM meme_last_ran");case 6:if(void 0===e.sent[0]){e.next=11;break}o="Command has already ran, so nothing else will be done.",e.next=22;break;case 11:return u=new Date,e.prev=12,e.next=15,a.query("INSERT into meme_last_ran (month, day) VALUES($1, $2)",[u.getMonth(),u.getDate()]);case 15:e.next=21;break;case 17:e.prev=17,e.t0=e.catch(12),console.log(e.t0),o="Something went wrong! yell at the dev!!!";case 21:o="Sucessfully started!";case 22:return e.abrupt("return",o);case 25:if(-1===n.indexOf("ls")){e.next=64;break}return s=void 0,e.prev=27,e.next=30,a.any("SELECT id, count FROM meme_count");case 30:s=e.sent,e.next=37;break;case 33:return e.prev=33,e.t1=e.catch(27),console.log(e.t1),e.abrupt("return","Something went wrong, it probably wasn't started");case 37:if(void 0!==s){e.next=39;break}return e.abrupt("return","Could not access database");case 39:if(0!=s.length){e.next=41;break}return e.abrupt("return","Nobody has posted any memes yet :(");case 41:for(c="List of everyone's scores:",f=!0,d=!1,l=void 0,e.prev=45,h=s[Symbol.iterator]();!(f=(p=h.next()).done);f=!0)v=p.value,void 0!==(m=i(v.id,r))?(y=m.username,c+="\n"+y+" - "+v.count):c+="\n"+m+" - "+v.count;e.next=53;break;case 49:e.prev=49,e.t2=e.catch(45),d=!0,l=e.t2;case 53:e.prev=53,e.prev=54,f||null==h.return||h.return();case 56:if(e.prev=56,!d){e.next=59;break}throw l;case 59:return e.finish(56);case 60:return e.finish(53);case 61:return e.abrupt("return",c);case 64:if(-1===n.indexOf("lastRan")){e.next=74;break}return e.next=67,a.any("SELECT month, day FROM meme_last_ran");case 67:if(void 0!=(b=e.sent)[0]){e.next=70;break}return e.abrupt("return","hasn't been ran before");case 70:return x="Last ran on "+(parseInt(b[0].month)+1)+"/"+b[0].day+"/2018",e.abrupt("return",x);case 74:if(-1===n.indexOf("resetTime")){e.next=83;break}if(t.hasPermission("ADMINISTRATOR")){e.next=78;break}return e.abrupt("return","You don't have the permissions for this command.");case 78:return e.next=80,a.query("DELETE FROM meme_last_ran");case 80:return e.abrupt("return","Successfully reset the time");case 83:if(-1===n.indexOf("resetCount")){e.next=90;break}if(t.hasPermission("ADMINISTRATOR")){e.next=87;break}return e.abrupt("return","You don't have the permissions for this command.");case 87:return e.next=89,a.query("DELETE FROM meme_count");case 89:return e.abrupt("return","Successfully reset the count");case 90:case"end":return e.stop()}},e,this,[[12,17],[27,33],[45,49,53,61],[54,,56,60]])}));return function(t,n,r,a){return e.apply(this,arguments)}}(),R=function(){var e=k(regeneratorRuntime.mark(function e(t,n,r){var a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.any("SELECT count FROM meme_count WHERE id = $1",t);case 3:a=e.sent,e.next=10;break;case 6:return e.prev=6,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return","something went wrong");case 10:if(0!==a.length){e.next=16;break}return e.next=13,r.query("INSERT into meme_count (id, count) VALUES($1, $2)",[t,n]);case 13:return e.abrupt("return","Added new entry!");case 16:return e.next=18,r.query("UPDATE meme_count SET count = $1 WHERE id = $2",[a[0].count+n,t]);case 18:return e.abrupt("return","Updated entry!");case 19:case"end":return e.stop()}},e,this,[[0,6]])}));return function(t,n,r){return e.apply(this,arguments)}}();function T(e,t,n,r,a,o,u){try{var i=e[o](u),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}function S(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function u(e){T(o,r,a,u,i,"next",e)}function i(e){T(o,r,a,u,i,"throw",e)}u(void 0)})}}var O=new Map([["ping",function(){return"Pong!"}],["say",function(e,t){var n=t.join(" ");return e.delete().catch(function(e){}),n}],["complain",function(){return u(x)}],["do",function(){return u(b)}],["motivate",function(){return u(y)}],["alive",function(e,t,n){return g(n,new Date)}],["help",function(){return"!ping - Tests to see if the bot is working\n!say - Tell the bot to say something\n!do - Tell the bot to do something\n!complain - Generate a random complaint\n!motivate - Generate a random motivation\n!alive - How long have I been alive for?\n!birthday add MM/DD/YYYY - add a birthday to the list\n!birthday ls - list everyone's birthday\n!memes ls - list the scoreboard for everyone's meme count"}],["birthday",function(){var e=S(regeneratorRuntime.mark(function e(t,n,r,a){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(t.author.id,n,r,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(t,n,r,a){return e.apply(this,arguments)}}()],["memes",function(){var e=S(regeneratorRuntime.mark(function e(t,n,r,a){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null===t.guild){e.next=9;break}return e.next=3,t.guild.fetchMember(t.author);case 3:return o=e.sent,e.next=6,E(o,n,r,a);case 6:return e.abrupt("return",e.sent);case 9:return e.abrupt("return","Command does not work in DM");case 10:case"end":return e.stop()}},e,this)}));return function(t,n,r,a){return e.apply(this,arguments)}}()]]);function M(e,t,n,r,a,o,u){try{var i=e[o](u),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}function A(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function u(e){M(o,r,a,u,i,"next",e)}function i(e){M(o,r,a,u,i,"throw",e)}u(void 0)})}}n(0).config();var I=n(4)();I.pg.defaults.ssl=!0;var _,L=I(process.env.DATABASE_URL),P=function(){var e=A(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return _=new Date,e.next=3,L.query("CREATE TABLE IF NOT EXISTS birthday (id text, date text)");case 3:return e.next=5,L.query("CREATE TABLE IF NOT EXISTS meme_last_ran (month text, day text)");case 5:return e.next=7,L.query("CREATE TABLE IF NOT EXISTS meme_count (id text, count int)");case 7:console.log("All database tables are ready!");case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),C=function(){var e=A(regeneratorRuntime.mark(function e(t,n){var r,a,o,u,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0===n.content.indexOf("!")){e.next=2;break}return e.abrupt("return");case 2:if(r=n.content.slice("!".length).trim().split(/ +/g),a=r.shift(),o=void 0!==a?a.toLowerCase():"undefined",u="Could not recognize command",void 0===(i=O.get(o))){e.next=29;break}if("alive"!=o){e.next=12;break}u=i(n,r,_),e.next=27;break;case 12:if("birthday"!=o){e.next=18;break}return e.next=15,i(n,r,t.users.array(),L);case 15:u=e.sent,e.next=27;break;case 18:if("memes"!=o){e.next=24;break}return e.next=21,i(n,r,t.users.array(),L);case 21:u=e.sent,e.next=27;break;case 24:return e.next=26,i(n,r);case 26:u=e.sent;case 27:e.next=30;break;case 29:u="Command not recognized.";case 30:void 0!==u&&n.channel.send(u);case 31:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),D=function(){var e=A(regeneratorRuntime.mark(function e(t,n){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.author.bot){e.next=2;break}return e.abrupt("return");case 2:if(0===n.content.indexOf("!")){e.next=17;break}return e.prev=3,e.next=6,n.awaitReactions(function(e,t){return!0},{time:3e5});case 6:return r=e.sent,e.next=9,R(n.author.id,r.size,L);case 9:e.sent,e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),console.log(e.t0);case 15:e.next=19;break;case 17:return e.next=19,C(t,n);case 19:case"end":return e.stop()}},e,this,[[3,12]])}));return function(t,n){return e.apply(this,arguments)}}();function N(e,t,n,r,a,o,u){try{var i=e[o](u),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}function q(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function u(e){N(o,r,a,u,i,"next",e)}function i(e){N(o,r,a,u,i,"throw",e)}u(void 0)})}}n(0).config();var F=new a.a.Client;F.on("ready",q(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Bot has started, with ".concat(F.users.size," users, in ").concat(F.channels.size," channels of ").concat(F.guilds.size," guilds.")),F.user.setActivity("Type !help for more info"),e.next=4,P();case 4:case"end":return e.stop()}},e,this)}))),F.on("message",function(){var e=q(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(F,t);case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),F.login(process.env.TOKEN).catch(function(e){console.log(e)})}]);