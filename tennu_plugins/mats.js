var fs = require("fs");

var MATSPlugin = {
    init: function (client, imports) {

        var getDisabled = imports.vars.getDisabled;

        var obj;
        fs.readFile('items.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
        });
        
        return {

            handlers: {
                
                '!matinfo': function (command) {
                    if (getDisabled())
                        return;
                    
                    if (command.args[0] == undefined) {
                        client.say(command.channel, "No item specifed!")
                        return;
                    }

                    var string = command.args[0];
                    for (i = 1; i < command.args.length; i++)
                        string += " " + command.args[1];

                    var flag = false;
                    Object.keys(obj).forEach(function(k) {
                        if(obj[k]["name"].toUpperCase() == string.toUpperCase()) {

                            flag = true;

                            if (obj[k]["type"] != "material") {

                                var s = "";

                                obj[k]["recipe"]["materials"].forEach(function(m) {

                                    s += m["count"] + " " + obj[m["id"]]["name"] + " "

                                });

                                client.say(command.channel, "\u0002 Recipe \u0002 Karma: " + obj[k]["recipe"]["karma"] + " | Materials: " + s);
                            }
                            else
                                client.say(command.channel, string + " is a " + obj[k]["type"]);
                        }
                    });

                    if (flag == false)
                        client.say(command.channel, "Item does not exist!");


                },

            },

            help: {
                'matinfo': ['@matinfo <item>', 'Gives data from datamine about given item',]
            },

            commands: ['matinfo']
        }
    },
    requiresRoles: ['vars']
};

module.exports = MATSPlugin;