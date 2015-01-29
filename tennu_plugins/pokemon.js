var dirty = require('dirty');
var db = dirty('res/poke.db');


var lr = new LineReader('res/poke.txt');
var pokemonz = [];
lr.on('line', function (lineno, line) {
	units.push(line);
});

var ballz = [

	"Poké Ball",
	"Great Ball",
	"Ultra Ball",
	"Master Ball",

];

var randomPokemon = function () {
	var index = Math.floor(Math.random () * pokemonz.length);  
	return pokemonz[index]; 
};

var randomBall = function () {
	var index = Math.floor(Math.random () * ballz.length);  
	return ballz[index]; 
};

var success = function(poke) {

	if (Math.floor(Math.random()*10) > 6)
		return "Gotcha! " + poke + " was caught!"
	else
		return "Aww, " + poke + " got away..."

};

var PokemonPlugin = {
    init: function (client, imports) {

    	const requiresAdmin = imports.admin.requiresAdmin;

        return {

            handlers: {

                '!throw': requiresAdmin(function (command) {
                	if (getDisabled())
                        return;

                    client.say(command.channel, command.nickname + " threw a " + randomBall() + "! Go, " + randomPokemon() + "!");
                }),

                '!encounter': requiresAdmin(function (command) {
                	if (getDisabled())
                        return;

                	var poke = randomPokemon();
                	client.say(command.channel, "A wild " + poke + " appeared!");
                	client.say(command.channel, "What do will " + command.nickname + " do? @ball, @stone, @bait");
                	db.set(command.nickname.toUpperCase(), {pokemon: poke, rate: 0.5, run: 0.2});

                }),

				'!stone': requiresAdmin(function (command) {
					if (getDisabled())
                        return;
					
					var value = db.get(command.nickname.toUpperCase());

					if (value == undefined) {

						client.say(command.channel, "No pokemon encountered!");
						return;

					}

					client.say(command.channel, "A stone was thrown!");
					var score = Math.random();
					if (score > value.run) {
						client.say(command.channel, db.get(value.pokemon + " got angry!");
						value.rate += 0.05;
						value.run += 0.05;
						db.set(command.nickname.toUpperCase(), value);
					} else {
						client.say(command.channel, db.get(command.nickname.toUpperCase()).pokemon + " ran away!");
						db.set(command.nickname.toUpperCase(), undefined);
					}

                }),

				'!bait': requiresAdmin(function (command) {
					if (getDisabled())
                        return;

					var value = db.get(command.nickname.toUpperCase());

					if (value == undefined) {

						client.say(command.channel, "No pokemon encountered!");
						return;

					}

					client.say(command.channel, "Bait was thrown!");
					var score = Math.random();
					if (score > db.get(command.nickname.toUpperCase()).run) {
						client.say(command.channel, db.get(command.nickname.toUpperCase()).pokemon + " took the bait!");
						value.rate -= 0.05;
						value.run -= 0.05;
						db.set(command.nickname.toUpperCase(), value);
					}
					else {
						client.say(command.channel, db.get(command.nickname.toUpperCase()).pokemon + " ran away!");
						db.set(command.nickname.toUpperCase(), undefined);
					}

                }),

				'!ball': requiresAdmin(function (command) {
					if (getDisabled())
                        return;

					var value = db.get(command.nickname.toUpperCase());

					if (value == undefined) {

						client.say(command.channel, "No pokemon encountered!");
						return;

					}

					client.say(command.channel, "A safari ball was thrown!");
					var score = Math.random();
					if (score > value.rate){
						client.say(command.channel, db.get(command.nickname.toUpperCase()).pokemon + " was caught!");
						db.set(command.nickname.toUpperCase(), undefined);
					}
					else if (score > value.run) {
						client.say(command.channel, value.pokemon + " knocked the ball away!");
					} else {
						client.say(command.channel, value.pokemon + " ran away!");
						db.set(command.nickname.toUpperCase(), undefined);
					}

                })            

            },

            help: {
                'throw': ['{{!}}throw', 'Throw out a random pokemon!'],
                'encounter': ['{{!}}encounter', 'Meet a random pokemon in the Safari Zone'],
                'stone': ['{{!}}stone', 'Throw a stone at the pokemon'],
                'bait': ['{{!}}bait', 'Throw bait at the pokemon'],
                'ball': ['{{!}}ball', 'Throw a dafari ball at the pokemon']
            },

            commands: ['throw', 'encounter', 'stone', 'bait', 'ball']
        }
    },
    requiresRoles: ['admin']
};


module.exports = PokemonPlugin;