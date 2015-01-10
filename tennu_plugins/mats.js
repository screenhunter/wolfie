var MATSPlugin = {
    init: function (client, imports) {

        var fs = require("fs");
        var obj;
        fs.readFile('items.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
        });
        
        return {

            handlers: {
                
                '!matinfo': function (command) {
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

module.exports = MATSPlugin;