//Read and set any environment variables with the .env package.
require("dotenv").config();

//Require data from File System npm package
var fs = require("fs");
//Require data from moment npm package
var moment = require('moment');
//Require data from Axios npm package
var axios = require("axios");
//Require data from node-spotify npm package
var Spotify = require('node-spotify-api');


// Requiring our spotify, OMDB, and bands in town modules exported from keys.js
var keys = require("./keys");
// Storing API keys in variables.
var spotify = new Spotify(keys.spotify);

//Creates initial user command.
var userCommand=process.argv[2];
//Creates user input.
var userInput=process.argv[3];

//Program conditions 
switch (userCommand) {
    // help function to clarify commands used
    case "help":
        console.log("Please type one of these commands\n"+
                    "'concert-this': to search your favorite artist concerts\n"+
                    "'spotify-this-song': to search your favorite song\n"+
                    "'movie-this': to search your favorite movie \n"+
                    "'do-what-it-says': using command from random.txt \n"
                    );
        break;
    case "concert-this":
        myConcert(userInput);
        break;
    case "spotify-this-song":
        mySpotify(userInput);
        break;
    case "movie-this":
        myMovies(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    //if anything else written
    default:
        console.log("LIRI doesn't understand that - Please type 'node liri.js help' for more information");
};

function myConcert(userInput) {
    var artist = userInput;
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown;

    axios.get(url).then(
        function (response) {
            // console.log(response.data[0])
            // console.log("Venue Time: "+moment(response.data[0].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
            for (var i = 0; i < 10; i++) {
                console.log("\nVenue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log("Venue Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
                console.log('--------------------------------------------------')
            }
        }
    );

};
