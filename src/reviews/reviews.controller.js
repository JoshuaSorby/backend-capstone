const service = require("./reviews.service");

async function reviewExists (req, res, next) {
  const reviewId = req.params.reviewId;
  const result = await service.read(reviewId);
  if (result) {
    res.locals.reviewId = reviewId;
    next();
    } else
  {
     next({
        status: 404,
        message: `cannot be found`
    })}

}

async function destroy (req, res, next) {
  await service.destroy(req.params.reviewId);
  res.sendStatus(204);
}

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.reviewId
  };
  service
    .update(updatedReview);
  next();
}

async function read (req, res, next) {
  const result = await service.read(req.params.reviewId)
  res.json({data: result})
}

async function updateRead (req, res, next) {
  const result = await service.read(req.params.reviewId)
  result.critic = await service.list(result.critic_id)
  result.created_at = "who knows";
  result.updated_at = "Right now!";
  res.json({data: result})
}





module.exports = {
    update: [reviewExists, update, updateRead],
  reviewExists,
  destroy: [reviewExists, destroy]
}