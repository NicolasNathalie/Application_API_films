const axios = require('axios');
const express = require('express');
const app = express();
app.set("view engine", "ejs");

app.use(express.static('public/css'));

app.get("/", (request,response)=>{
    response.redirect("/search");
});

app.get('/search', (request, response) => {
    response.setHeader("Content-Type", "text/html");
    response.render("search");
});

app.get('/result', (request, response) => {

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=6942b2a0105b422bb121f752a999d06d'+ '&query=' + request.query.search)
        .then(resultat => {
            console.log(resultat.data);
            response.render("movies",{search: request.query.search, result : resultat.data.results});
            });
});

app.listen(3000, ()=>{console.log("Votre serveur demarre au port-" , 3000);});
