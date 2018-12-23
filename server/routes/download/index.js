const express = require('express');
const co = require('co');
const { request } = require('../../utils');

const router = express.Router();

router.get('/song/:songTitle/:id/:code', (req, res, next) => {

  const { code, songTitle } = req.params;
  let type = 'audio';
  // TO DO: use async await when targeting node 8.0
  let origin_url = "https://mp3.zing.vn/xhr/media/"; // get when check network
  // with different code we still get code
  let param_uri = `get-source?type=${type}&key=${code}`;; // get when check network
  let final_uri = origin_url + param_uri;
  
  co(function* () {
    const response = yield request(final_uri);
    const  data  = JSON.parse(response).data;
    const songURI = `http:${data.source['128']}`;
    res.header('Content-disposition', `attachment; filename=${songTitle}.mp3`);
    request(songURI).pipe(res);

  })   
  .catch(err => next(err));
  // ==============================
  // const { songTitle, id } = req.params;

  // co(function* () {
  //   const html = yield request(`https://mp3.zing.vn/bai-hat/${songTitle}/${id}.html`);
  //   const regex = /media\/get-source\?type=audio&key=.{33}/; // get the resouce url
  //   const match = html.match(regex);
  //   if (!match) throw new Error("can't find the resource URL");

  //   const [matchUrl] = match;
  //   const resource = yield request(`https://mp3.zing.vn/xhr/${matchUrl}`);
  //   const data = JSON.parse(resource).data;
  //   const songURI = `http:${data.source['128']}`;

  //   res.header('Content-disposition', `attachment; filename=${songTitle}.mp3`);
  //   request(songURI).pipe(res);
  // })
  // .catch(err => next(err));
});

module.exports = router;
