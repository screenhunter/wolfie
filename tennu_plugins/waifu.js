var dirty = require('dirty');
var db = dirty('database.db');
var LineReader = require('linereader');

var WAIFUPlugin = {
    init: function (client, imports) {

        var lr = new LineReader('units.txt');
        var units = [];
        lr.on('line', function (lineno, line) {
            units.push(line);
        });
        
        return {

            handlers: {
                
                '!rem': function (command) {
                    if (command.args[0] == undefined)
                        client.say(command.channel, "No waifu specifed!")
                    else {
                        db.set(command.nickname.toUpperCase(), {waifu: command.args[0]});
                        client.say(command.channel, "Stored " + command.nickname + "'s waifu as " + command.args[0]);
                    }
                },
                '!waifu': function (command) {
                    if (db.get(command.nickname.toUpperCase()).waifu == undefined)
                        client.say(command.channel, "No waifu stored for " + command.nickname + "!")
                    else
                        client.say(command.channel, command.nickname + "'s Waifu: " + db.get(command.nickname.toUpperCase()).waifu);
                },
                '!gimme': function (command) {
                    var w = units[Math.floor(Math.random()*units.length)];
                    db.set(command.nickname.toUpperCase(), {waifu: w});
                    client.say(command.channel, "Your new waifu: " + w);
                }

            },

            help: {
                'rem': ['@rem <target>', 'Stores target as your waifu'],
                'waifu': ['@waifu', 'Retrieves your waifu from the database'],
                'gimme': ['@gimme', 'Randomly assigns you a waifu']
            },

            commands: ['rem', 'waifu', 'gimme']
        }
    }
};

module.exports = WAIFUPlugin;