var fs = require ( 'fs' )
var bodyParser = require ( 'body-parser' )
var jf = require ( 'jf' )
var express = require ( 'express')
var sass = require ( 'node-sass' )
var sassMiddleware = require ( 'node-sass-middleware' )
var path = require('path');
var app = express ( )

app.set( 'views', __dirname + '/views' )
app.engine( 'html', require( 'ejs' ).renderFile )

app.use(
 sassMiddleware({
   src: __dirname + '/sass', 
   dest: __dirname + '/public/',
   debug: true      
 }))

app.use( express.static ( path.join ( __dirname + '/public' ) ) )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json ( ) )

app.get ( '/', function ( request, response ) {
	response.render ( 'index.html' )  
} )

app.get ( '/about', function ( request, response ) {
	response.render ( 'about.html' )  
} )

app.get ( '/contact', function ( request, response ) {
	response.render ( 'contact.html' )  
} )

app.get ( '/project', function ( request, response ) {
	response.render ( 'project.html' )
} )

app.post ( '/message', function ( request, response ) {
  var message = request.body
  var contacts = fs.readFileSync ( './contacts.json' )
  var messages = JSON.parse ( contacts )
  messages.push ( message )
  var contactJSON = JSON.stringify ( messages )
  fs.writeFileSync ( './contacts.json', contactJSON )
  response.send ( 'Your message has been saved, I will get back to you as soon as I can!' )
} )

app.listen ( 3000 )