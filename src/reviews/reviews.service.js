const knex = require("../db/connection");

function read (reviewId) {
  return knex("reviews")
  .select("*")
  .where({review_id: reviewId})
  .first()
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0])
}
  
function destroy (reviewId) {
  return knex("reviews")
    .del("*")
    .where({review_id: reviewId})
}

function list (id) {
  return knex("critics")
  .select("*")
  .where({critic_id: id})
  .first()
}
module.exports = {
    update,
  destroy,
  list,
  read,

}