const service = require("./theaters.service");



async function list (req, res, next) {
    const results = await service.list();
    const moviesResults = await service.movieList(1);
    results.forEach((result) => result.movies = moviesResults )
    res.json({data: results})
  
}



module.exports = {
    list,
}