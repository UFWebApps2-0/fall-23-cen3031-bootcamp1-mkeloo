var http = require('http'),
  fs = require('fs'),
  port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
  /*Investigate the request object. 
    You will need to use several of its properties: url and method
  */
  //   console.log(request.url, 'this is the url');
  // console.log(
  //   request.url === '/listings',
  //   'this is http://127.0.0.1:8080/listings url.'
  // );

  //   console.log(request.method, 'this is the method');
  // console.log(request.method === 'GET', 'this is the GET method');
  // console.log(request.method === 'GET' && request.url === '/listings');

  //   console.log(request.headers, 'this is the headers');
  // console.log(request.headers, 'this is the headers');

  //   Your request handler should send listingData in the JSON format as a response if a GET request is sent to the '/listings' path. Otherwise, it should send a 404 error.

  // Check if it's a GET request to the path '/listings'
  if (request.method === 'GET' && request.url === '/listings') {
    // Set response header for JSON data and status 200 (OK)
    response.writeHead(200, { 'Content-Type': 'application/json' });

    // send the listingData in the JSON format as a response
    response.end(JSON.stringify(listingData));
  } else {
    // for everything else, send a 404 error
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Error 404: Not Found');
  }
};

fs.readFile('listings.json', 'utf8', function (err, data) {
  // Check for errors
  if (err) throw err;

  // parse the read data and save it into the listingData variable
  listingData = JSON.parse(data);

  // Create the server
  server = http.createServer(requestHandler);

  // Start the server
  server.listen(port, function () {
    console.log('Server on: http://127.0.0.1:' + port);
  });
});
