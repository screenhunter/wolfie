var KritikaPlugin = {
    init: function (client, imports) {
        return {
            handlers: {
                '!kritika': function (command) {
                	if (getDisabled())
                        return;
                    
                    client.say(command.channel, 'Ciara/Arus/Falma/screenhunter has strong feelings for Kritika Singh <3<3');
                }
            },
        };
    }
};

module.exports = KritikaPlugin;