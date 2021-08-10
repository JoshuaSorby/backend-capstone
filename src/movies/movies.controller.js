const service = require("./movies.service");


async function list (req, res, next) {
    if (req.query.is_showing) {res.json({data: await service.showingList()})} else {
    const result = await service.list();
    res.json({data: result})
    }
    
  
}

async function reviewList (req, res, next) {
  const results = await service.reviewList(req.params.movieId)
  res.json({data: results})
}

async function theaterList (req, res, next) {
  const result = await service.theaterList(req.params.movieId)
  res.json({data: result})
}

async function read (req, res, next) {
    const result = await service.read(req.params.movieId)
    if (result) {
      res.json({data: result});
    } else {
      next({status: 404,
           message: "cannot be found"})
    }
}

module.exports = {
    list,
    theaterList,
    reviewList,
    read
}