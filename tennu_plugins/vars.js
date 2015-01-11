var VARSPlugin =  {

    init: function (client, imports) {
		var disabled = false;
		const requiresAdmin = imports.admin.requiresAdmin;
		
		const getDisabled = function() {

			return disabled;

		};

    	return {

    		handlers: {

    			'!disable': requiresAdmin(function (command) {

                    disabled = !disabled;

                    if (!disabled)
                        client.act(command.channel, 'is now enabled!');
                    else
                        client.act(command.channel, 'is now disabled :(');

                }),

    		},
    		exports: {

    			getDisabled: getDisabled

    		},

    		help: {
                'disable': ['@disable', 'Enable/Disable Wolfie'],
            },

            commands: ['disable']

    	}

    },
    role: 'vars',
    requiresRoles: ['admin']

}

module.exports = VARSPlugin;