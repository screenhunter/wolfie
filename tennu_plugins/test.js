var makeUserDict = function(){

    
    
};
 
module.exports = {
    init: function (client, imports) {
        var waifuDbLocation = client.config("waifu-db");
        var waifu = makeUserDict({
            db: waifuDbLocation,
            format: "Your waifu is %s."
        });
 
        return {
            handlers: {
                "!rem": waifu.setter,
                "!waifu", waifu.getter
            },
 
            help: { ... },
 
            commands: ["rem", "waifu"]
        };
    }
};