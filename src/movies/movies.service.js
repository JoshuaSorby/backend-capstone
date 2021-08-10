const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

//This is to be used for submitting the array of reviews with the critic //property added.
const variable = [];

const addCriticProperty = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"
})

function list () {
    return knex("movies")
    .select("rating", "title", "runtime_in_minutes")
}

function theaterList(movieId) {
  return knex("theaters")
    .join("movies_theaters as mt")
    .select("*")
  .groupBy("name")
  .orderBy("zip", "desc")
  .where({movie_id: movieId})
  .andWhere({is_showing: true})
}

function reviewList (movieId) {
  return knex("reviews as r")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("*")
  .where({movie_id: movieId})
  .then((results) => { return results.map((result) => addCriticProperty(result))})
  .then(variable)
}

function showingList () {
    return knex("movies")
    .leftJoin("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .select("title")
  .groupBy("title")
    .where({is_showing: true})
}

function read (movieId) {
    return knex("movies")
    .select("description" ,"image_url", "rating", "runtime_in_minutes", "title", "movie_id")
  .where({movie_id: movieId})
    .then((createdRecords) => createdRecords[0])
}




module.exports = {
  theaterList,
  list,
  read,
  reviewList,
  showingList
}