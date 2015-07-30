// Description:
// Example scripts for you to examine and try out.
//
// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.
//
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = function(robot) {
    robot.hear(/badger/i, function(res) {
        res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
    });
    robot.hear(/james/i, function(res) {
        res.send("I agree. James is silly.");
        res.send("Jk");
    });
    robot.hear(/What is my name/i, function(res) {
        res.send("<@" + res.message.user.id + "|bob>");
    });
    robot.respond(/(Hello|Hi)/i, function(res) {
        res.send("Hi, " + res.message.user.real_name);
    });
    robot.hear(/What channel?/i, function(res) {
        res.send("" + res.message.room);
    });
    robot.hear(/Sign (In|Out): (.+)/i, function(res) {
        var nameMatch = /^([a-z]+\s[a-z]+)(?!.)/i.exec(res.match[2]);
        if (nameMatch == null) {
            res.send("Invalid Name");
        } else {
            res.send("Loading...");
            var request = require('request');
            request({
                method: 'POST',
    			url: 'https://script.google.com/macros/s/AKfycbyrK4j82p5knap2O6lExfFoy7BQnhdQm-Kq9jqNtVV03PkjB7E/exec',
    			followAllRedirects: true,
            }, function (error, response, body) {
                var data = JSON.parse(body);
                res.send(data.text);
            }).form({
                inOrOut:res.match[1],
                fullName:nameMatch[1]
            });
        };
    });
    robot.hear(/funny|lol/i, function(res) {
        res.send("Ayy Lmao!");
    });
};

