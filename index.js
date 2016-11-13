'use strict';
//Lets require/import the HTTP module
const http = require('http');
const fetch = require( 'node-fetch' );

//Lets define a port we want to listen to
const PORT=8082;

const fetchUrl = ( url ) => {
	fetch( url )
		.then( ( response ) => {
			return response.text();
		} )
		.then( ( text ) => {
			//console.log( text );
		} )
		.catch( () => {} );
};

//We need a function which handles requests and send response
function handleRequest(request, response){
	if ( request.method !== 'POST' ) {
		console.log( 'ignoring request with method: ' + request.method );
		response.end();
		return;
	}

	response.end( JSON.stringify( { status: 'ok' } ) );

	let data = '';
	request.on( 'data', ( chunk ) => {
		data = data + chunk.toString();
	} );

	request.on( 'end', () => {
		console.log( data );
		fetchUrl( 'https://nabeel.us' );
	} );
}

//Create a server
var server = http.createServer( handleRequest );

//Lets start our server
server.listen(PORT, function(){
	//Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on: http://localhost:%s", PORT);
});
