var dirty = require('dirty');
var db = dirty('database.db');

var CODEPlugin = {
    init: function (client, imports) {

        var getDisabled = imports.vars.getDisabled;

        return {

            handlers: {
                
                '!store': function (command) {
                    if (getDisabled())
                        return;

                    if (command.args[0] == undefined)
                        client.say(command.channel, "No code specifed!")
                    else {
                        db.set(command.nickname.toUpperCase(), {code: command.args[0]});
                        client.say(command.channel, "Stored " + command.nickname + "'s code as " + command.args[0]);
                    }
                },
                '!getcode': function (command) {
                    if (getDisabled())
                        return;
                    
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
                'store': ['@store <target>', 'Stores target as your friend code'],
                'getcode': ['@getcode <target>', 'Retrieves targets friend code (returns your own if no target specified)']
            },

            commands: ['rem', 'waifu', 'gimme']
        }
    },
    requiresRoles: ['vars']
};

module.exports = CODEPlugin;