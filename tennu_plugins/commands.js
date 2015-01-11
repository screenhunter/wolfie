var CMDPlugin = {
    init: function (client, imports) {

        var ans =["Yes", "No"];
        var bold = function (str) { return "\u0002" + str + "\u0002";};

        return {

            handlers: {
                '!bless': function (command) {
                    if (command.args[0] == undefined)
                        client.act(command.channel, 'gives Ciara\'s blessing to ' + command.nickname);
                    else
                        client.act(command.channel, 'gives Ciara\'s blessing to ' + command.args[0] + ' for ' + command.nickname);
                },
                '!curse': function (command) {
                    if (command.args[0] == undefined)
                        client.say(command.channel, "No one to curse!")
                    else
                        client.act(command.channel, 'curses ' + command.args[0] + ' for ' + command.nickname);
                },
                '!kill': function (command) {
                    if (command.args[0] == undefined)
                        client.say(command.channel, "No one to kill!")
                    else
                        client.act(command.channel, 'brutally murders ' + command.args[0] + ' for ' + command.nickname);
                },
                '!devour': function (command) {
                    if (command.args[0] == undefined)
                        client.say(command.channel, "No one to eat!")
                    else
                        client.act(command.channel, 'devours ' + command.args[0] + ' for ' + command.nickname);
                },
                '!suicide': function (command) {
                    client.act(command.channel, 'commmits sudoku');
                },
                '!pick': function (command) {
                    client.say(command.channel, bold(ans[Math.floor(Math.random()*ans.length)]));
                },
                '!pet': function (command) {
                    client.act(command.channel, " purrs and curls up next to you.");
                },


            },

            help: {
                'bless': ['@bless <target> = Blesses the target, (blesses yourself if no target specified)'],
                'curse': ['@curse <target> = Curses the target'],
                'kill': ['@kill <target> = Brutally murders the target'],
                'suicide': ['@suicide = What do you think'],
                'pick': ['@pick = In case RNG is frowning upon your soul'],
                'devour': ['@devour <target> = Devours the target'],
                'pet': ['@pet = Pet wolfie!']
            },

            commands: ['bless', 'curse', 'kill', 'suicide', 'pick', 'devour', 'pet']
        }
    }
};

module.exports = CMDPlugin;