// OPZETTEN VAN DE WEBSERVER

    // Importeer het npm pakket express uit de node_modules map
    import express from "express";

    // Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

    // Maak een nieuwe express app aan
const app = express();

// Niewe plylist aanmaken
let newPlaylist = []

    // Stel ejs in als template engine
app.set("view engine", "ejs");

    // Stel de map met ejs templates in
app.set("views", "./views");

    // Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

    // Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

// ROUTES
   
app.get("/", function (request, response) {      // Maak een GET route voor de homepage
    response.render("homepage", {});          // Render homepage.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd stories
  });

  app.get("/testing", function (request, response) {      // Maak een GET route voor de testing page
    response.send("testing");         
  });
      
  app.get("/lessons", function (request, response) {      // Maak een GET route voor de lessons page
    Promise.all([
      fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
      fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
      fetchJson('https://fdnd-agency.directus.app/items/tm_playlist'),
      fetchJson('https://fdnd-agency.directus.app/items/tm_audio')]).then(([storyData, languageData, playlistData, audioData]) => {    // Haal alle playlists uit de directus API op
      response.render('lessons', {         // Render lessons.ejs uit de views map en geef de opgehaalde data mee als variabele, genaamd playlistData, storyData, languageData, audioData
        stories: storyData.data, 
        language: languageData.data,
        playlist: playlistData.data, 
        audio: audioData.data,
        newPlaylists: newPlaylist})  
    });   
  });
  
  app.get("/stories", function (request, response) {      // GET route voor de stories page
    Promise.all([
      fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
      fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
      fetchJson('https://fdnd-agency.directus.app/items/tm_audio')]).then(([storyData, languageData, playlistData, audioData]) => {    // Haal alle playlists uit de directus API op
      response.render('stories', {
        stories: storyData.data, 
        language: languageData.data,
        playlist: playlistData.data,
      });
    });
  });

  app.get("/add-a-playlist", function (request, response) {
    response.render("add-a-playlist", {});
  })

  app.post("/add-a-playlist", function (request, response) { 
    newPlaylist.push(request.body(newPlaylists))
    console.log(newPlaylist);
    response.redirect(303, '/lessons/');

  })
  
  app.get("/statistics", function (request, response) {      //GET route voor de statistics page
    response.send("statistics");         
  });
  
  app.get("/profile", function (request, response) {      // Maak een GET route voor de profile page
    response.send("profile");         
  });
  

//   START DE WEBSERVER

    // Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

    // Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
    // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});