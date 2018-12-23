const { request } = require('utils');
// const redisClient = require('lib/Redis');
// const { getRedisKey } = require('utils');

module.exports = function (req, res, next) {
  const { id } = req.params;
  console.log(req.query)
  //request(`http://mp3.zing.vn/json/charts?op=get&type=song&id=${id}`)//ZGJHtLkHChZdNAuyGyDmLHtkWApWWHLau
  request(`http://mp3.zing.vn/xhr/media/get-source?type=album&key=${id}`)
  console.log("id: " + id)
    .then(data => {
      console.log(data)
      // redisClient.set(getRedisKey(req), data, 'EX', 60 * 60 * 24 * 5);
      res.json(JSON.parse(data));
    })
    .catch(err => next(err));
};
