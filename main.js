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

var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/', secret: 'aFrrEwDeT54d7yUijtyNbfa' });

var hipchat = require('node-hipchat');

var HC = new hipchat('09dc7be7e02bdc9caf375ee67dcec9');


var events = require('github-webhook-handler/events')
Object.keys(events).forEach(function (event) {
  console.log(event, '=', events[event])
})

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(4000)

handler.on('error', function (err) {
  console.log('Error:', err.message)
})

handler.on('push', function (event) {
	HC.postMessage(	{room: 959020, // Found in the JSON response from the call above
		from: 'IronBot',
		message: '<strong>Ironbot</strong> will update ' + event.payload.repository.name + ' to ' + event.payload.ref,
		color: 'yellow'},
		function(data) {
			console.log('Received a push event for %s to %s',
    			event.payload.repository.name,
    			event.payload.ref)
	})
})


HC.postMessage(params, function(data) {
  // Message has been sent!
});
