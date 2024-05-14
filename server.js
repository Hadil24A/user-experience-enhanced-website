// 1. OPZETTEN VAN DE WEBSERVER

import express, { request } from "express";

import fetchJson from "./helpers/fetch-json.js";

let app = express();

let newPlaylist = []; // Niewe playlist aanmaken

let favourites = {};

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// 2. ROUTES

app.get("/", function (request, response) {
  response.render("homepage", {});
});

app.get("/testing", function (request, response) {
  response.send("testing");
});

app.get("/lessons", function (request, response) {
  Promise.all([
    fetchJson(
      "https://fdnd-agency.directus.app/items/tm_story?fields=*,image.id,image.height,image.width"
    ),
    fetchJson("https://fdnd-agency.directus.app/items/tm_language"),
    fetchJson(
      "https://fdnd-agency.directus.app/items/tm_playlist?fields=*,image.id,image.height,image.width"
    ),
    fetchJson("https://fdnd-agency.directus.app/items/tm_audio"),
  ]).then(([storyData, languageData, playlistData, audioData]) => {
    let likedPlaylists = playlistData.data.filter(
      (playlist) => favourites[playlist.id]
    );
    let playlistIds = playlistData.data.map((playlist) => playlist.id);

    response.render("lessons", {
      stories: storyData.data,
      language: languageData.data,
      playlist: playlistData.data,
      audio: audioData.data,
      favourites: favourites,
      likedPlaylists: likedPlaylists,
      newPlaylists: newPlaylist,
      playlistIds: playlistIds,
    });
  });
});

app.post("/like-or-unlike/:playlistId", function (request, response) {
  let playlistId = Number(request.params.playlistId);
  let action = request.body.action;
  console.log(action, playlistId);

  if (action === "like") {
    favourites[playlistId] = true;
  } else if (action === "unlike") {
    delete favourites[playlistId];
  }

  response.redirect(303, "/lessons");
});

// if (request.body.enhanced) {
//     response.render('playlist');
// } else {
//     response.redirect(303, '/lessons');
// }

app.get("/allStories", function (request, response) {
  Promise.all([
    fetchJson("https://fdnd-agency.directus.app/items/tm_story"),
    fetchJson("https://fdnd-agency.directus.app/items/tm_language"),
    fetchJson("https://fdnd-agency.directus.app/items/tm_audio"),
  ]).then(([storyData, languageData, playlistData, audioData]) => {
    response.render("allStories", {
      stories: storyData.data,
      language: languageData.data,
      playlist: playlistData.data,
    });
  });
});

app.get("/new-playlist", function (request, response) {
  response.render("new-playlist", {});
});

app.post("/new-playlist", function (request, response) {
  newPlaylist.push(request.body(newPlaylists));
  console.log(newPlaylist);
  response.redirect(303, "/lessons/");
});

app.get("/statistics", function (request, response) {
  response.send("statistics");
});

app.get("/profile", function (request, response) {
  response.send("profile");
});

// 3. START DE WEBSERVER

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
