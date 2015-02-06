var fs = require("fs");

var MATSPlugin = {
    init: function (client, imports) {

        var getDisabled = imports.vars.getDisabled;

        var inf;
        fs.readFile('res/items.json', 'utf8', function (err, data) {
            if (err) throw err;
            inf = JSON.parse(data);
        });

        var loc;
        fs.readFile('res/itemloc.json', 'utf8', function (err, data) {
            if (err) throw err;
            loc = JSON.parse(data);
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
                        string += " " + command.args[i];

                    var flag = false;
                    Object.keys(inf).forEach(function(k) {
                        if(inf[k]["name"].toUpperCase() == string.toUpperCase()) {

                            flag = true;

                            if (inf[k]["type"] != "material") {

                                var s = "";

                                inf[k]["recipe"]["materials"].forEach(function(m) {

                                    s += m["count"] + " " + inf[m["id"]]["name"] + "  "

                                });

                                client.say(command.channel, "\u0002 Recipe: \u0002 Karma: " + inf[k]["recipe"]["karma"] + " | Materials: " + s);
                            }
                            else {
                                client.say(command.channel, string + " is a " + inf[k]["type"]);

                                Object.keys(loc).forEach(function(k) {

                                    if(k == string.toUpperCase()) {

                                        client.say(command.channel, "Locations found:" + inf[k]);

                                    }

                                }

                            }
                        }
                    });

                    if (flag == false)
                        client.say(command.channel, "Item does not exist!");


                },

            },

            help: {
                'matinfo': ['{{!}}matinfo <item>', 'Gives data from datamine about given item',]
            },

            commands: ['matinfo']
        }
    },
    requiresRoles: ['vars']
};

module.exports = MATSPlugin;