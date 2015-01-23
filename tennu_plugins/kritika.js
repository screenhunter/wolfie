var KritikaPlugin = {
    init: function (client, imports) {
        return {
            handlers: {
                '!!kritika': function (command) {
                    client.say(command.channel, 'Ciara/Arus/Falma/screenhunter has strong feelings for Kritika Singh <3<3');
                }
            },
        };
    }
};

module.exports = KritikaPlugin;