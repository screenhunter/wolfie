var dirty = require('dirty');
var db = dirty('res/waifu.db');
var LineReader = require('linereader');

var WAIFUPlugin = {
    init: function (client, imports) {

        var getDisabled = imports.vars.getDisabled;

        var lr = new LineReader('res/units.txt');
        var units = [];
        lr.on('line', function (lineno, line) {
            units.push(line);
        });
        
        return {

            handlers: {
                
                '!rem': function (command) {

                    if (getDisabled())
                        return;

                    if (command.args[0] == undefined)
                        client.say(command.channel, "No waifu specifed!")
                    else {
                        db.set(command.nickname.toUpperCase(), {waifu: command.args[0]});
                        client.say(command.channel, "Stored " + command.nickname + "'s waifu as " + command.args[0]);
                    }
                },
                '!waifu': function (command) {
                    if (getDisabled())
                        return;

                    if (db.get(command.nickname.toUpperCase()).waifu == undefined)
                        client.say(command.channel, "No waifu stored for " + command.nickname + "!");
                    else
                        client.say(command.channel, command.nickname + "'s Waifu: " + db.get(command.nickname.toUpperCase()).waifu);
                },
                '!gimme': function (command) {

                    if (getDisabled())
                        return;

                    var w = units[Math.floor(Math.random()*units.length)];
                    db.set(command.nickname.toUpperCase(), {waifu: w});
                    client.say(command.channel, "Your new waifu: " + w);
                },
                '!delete': function (command) {
                    if (getDisabled())
                        return;
                    
                    if (db.get(command.nickname.toUpperCase()).waifu == undefined)
                        client.say(command.channel, "No waifu stored for " + command.nickname + "!");
                    else {
                        db.set(command.nickname.toUpperCase(), {waifu: undefined});
                        client.say(command.channel, "Deleted " + command.nickname + "'s waifu");
                    }
                }

            },

            help: {
                'rem': ['{{!}}rem <target>', 'Stores target as your waifu'],
                'waifu': ['{{!}}waifu', 'Retrieves your waifu from the database'],
                'gimme': ['{{!}}gimme', 'Randomly assigns you a waifu'],
                'delete': ['{{!}}delete', 'Deletes stored waifu from the database']
            },

            commands: ['rem', 'waifu', 'gimme', 'delete']
        }
    },
    requiresRoles: ['vars']
};

module.exports = WAIFUPlugin;