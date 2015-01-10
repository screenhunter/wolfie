var CODEPlugin = {
    init: function (client, imports) {

        var dirty = require('dirty');
        var db = dirty('database.db');
        return {

            handlers: {
                
                '!store': function (command) {
                    if (command.args[0] == undefined)
                        client.say(command.channel, "No code specifed!")
                    else {
                        db.set(command.nickname.toUpperCase(), {code: command.args[0]});
                        client.say(command.channel, "Stored " + command.nickname + "'s code as " + command.args[0]);
                    }
                },
                '!getcode': function (command) {
                    if (command.args[0] == undefined)
                        if (db.get(command.nickname.toUpperCase()).code == undefined)
                            client.say("No code stored for " + command.nickname + "!")
                        else
                            client.say(command.channel, command.nickname + "'s code: " + db.get(command.nickname.toUpperCase()).code);
                    else
                        if (db.get(command.args[0].toUpperCase()) == undefined)
                            client.say("No code stored for " + command.args[0] + "!");
                        else
                            client.say(command.channel, command.args[0] + "'s code: " + db.get(command.args[0].toUpperCase()).code);
                }

            },

            help: {
                'data': [
                    '@rem = Stores a specified unit as your waifu',
                    '@waifu = Retrieves your waifu from the database',
                    '@gimme = Randomly assigns you a waifu'
                ]
            },

            commands: ['rem', 'waifu', 'gimme']
        }
    }
};

module.exports = CODEPlugin;