const knex = require("../db/connection");

function list () {
    return knex("theaters as t")
    .select("t.*")
}

function movieList(theaterId) {
  return knex("movies_theaters as mt")
  .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
  .where({theater_id: theaterId})
}

module.exports = {
    list,
  movieList

}