var JudgePlugin = {
    init: function (client, imports) {
        var ans = [
                    "GUILTY. THROW HIM/HER INTO MY LITTER BOX.",
                    "INNOCENT. NOW SCRATCH MY BELLY OR DIE.",
                    "ERROR. VERDICT 404 NOT FOUND." // Notice there's no comma on the last one.
                  ];
        var bold = function (str) { return "\u0002" + str + "\u0002"; }
        return {
            handlers: {
                '!judge': function (command) {
                    if (command.args[0] == undefined)
                        client.act(command.channel, 'is judging the Accused');
                    else
                        client.act(command.channel, 'is judging ' + command.args[0]);
                    setTimeout(function(){
                  client.say(command.channel, bold(ans[Math.floor(Math.random()*ans.length)]));

                    }, 3000);
                    
                },
            },

            help: {
                'command': [
                    '!judge',
                    ' ',
                    'Judges the accused.'
                ]
            },

            commands: ['judge']
        }
    }
};

module.exports = JudgePlugin;