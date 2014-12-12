/*
Codes that github sends

commit_comment = Any time a Commit is commented on
create = Any time a Repository, Branch, or Tag is created
delete = Any time a Branch or Tag is deleted
deployment_status = Any time a deployment for the Repository has a status update from the API
deployment = Any time a Repository has a new deployment created from the API
fork = Any time a Repository is forked
gollum = Any time a Wiki page is updated
issue_comment = Any time an Issue is commented on
issues = Any time an Issue is opened or closed
member = Any time a User is added as a collaborator to a non-Organization Repository
page_build = Any time a Pages site is built or results in a failed build
public = Any time a Repository changes from private to public
pull_request_review_comment = Any time a Commit is commented on while inside a Pull Request review (the Files Changed tab)
pull_request = Any time a Pull Request is opened, closed, or synchronized (updated due to a new push in the branch that the pull request is tracking)
push = Any git push to a Repository. This is the default event
release = Any time a Release is published in the Repository
status = Any time a Repository has a status update from the API
team_add = Any time a team is added or modified on a Repository
watchAny = time a User watches the Repository

*/

var config = require('/opt/ironbane-secret/ironbot-settings/ibconfig.json');
var exec = require('exec');
var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({
    path: config.path,
    secret: config.gitsecret
});

var NRP = require('node-redis-pubsub'),
    nrpConfig = {
        port: 6379, // TODO: use config
        scope: 'ironbot'
    },
    nrp = new NRP(nrpConfig);

var hipchat = require('node-hipchat');

var HC = new hipchat(config.hipsecret);

var events = require('github-webhook-handler/events');
Object.keys(events).forEach(function (event) {
    console.log(event, '=', events[event]);
});

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    });
}).listen(config.port);

handler.on('error', function (err) {
    console.log('Error:', err.message);
});

function updateServer(serverId, revision) {
    HC.postMessage({
            room: config.hiproom, // Found in the JSON response from the call above
            from: 'IronBot',
            message: '<strong>Ironbot</strong> will update ' + serverId + ' to ' + revision,
            color: 'yellow'
        },
        function (data) {
            // TODO: something with this response?
        });

    switch (serverId) {
        case 'ironbane-ironbot':
            // Just update the bot, don't do fancy stuff
            console.log('Do stuff for ironbot');
            exec('/bin/bash /opt/ironbane-ironbot/update_ironbot.sh', function (err, out, code) {
                console.log(out);
            });
            break;

        case 'ironbane-router':
            // Just update the router, don't do fancy stuff
            console.log('Do stuff for router');
            exec('/bin/bash /opt/ironbane-ironbot/update_router.sh', function (err, out, code) {
                console.log(out);
            });
            break;

        // TODO: pass revision in as arg $1 for checkout
        case 'ironbane-dev-server':
            console.log('Do stuff for dev server');
            exec('/bin/bash /opt/ironbane-ironbot/update_dev.sh', function (err, out, code) {
                console.log(out);
            });
            break;

        case 'ironbane-play-server':
            console.log('Do stuff for play server');
            exec('/bin/bash /opt/ironbane-ironbot/update_play.sh', function (err, out, code) {
                console.log(out);
            });
            break;

        default:
            // Don't do anything
            break;
    }
}

nrp.on('update', function (data) {
    var server = data.server,
        rev = data.rev;

    // do it!
    updateServer(server, rev);
});

handler.on('push', function (event) {
    var repo = event.payload.repository.name,
        ref = event.payload.ref;

    console.log('Received a push event for %s to %s', repo, ref);

    // we update all on master, tho the "ironbane-server" is split by master & tags... other servers are not updated based on tags
    if (ref === 'refs/heads/master') {
        if (repo === 'ironbane-server') {
            repo = 'ironbane-dev-server';
        }
        updateServer(repo, ref);
    } else if (ref.search('tags') >= 0) {
        if (repo === 'ironbane-server') {
            repo = 'ironbane-play-server';
            updateServer(repo, ref);
        }
    }

});
