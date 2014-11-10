var config = require('/opt/ironbane-secret/ironbot-settings/ibconfig.json');
var hipchat = require('node-hipchat');
var HC = new hipchat(config.hipsecret);

// Send message to the HipChat so we all know what happened
HC.postMessage(	{room: config.hiproom, // Found in the JSON response from the call above
    from: 'IronBot',
    message: '<strong>Ironbot</strong> ' + process.argv[2],
    color: process.argv[3]},
    function(data) { }
)