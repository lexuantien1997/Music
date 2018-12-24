const { request } = require('utils');
const Scraper = require('lib/PageScraper');
const co = require('co');
const axios = require("axios");
module.exports = function getAlbumPlaylist(req, res, next) {

  // const { code } = req.query;
  // let type = 'album';
  // // TO DO: use async await when targeting node 8.0
  // let origin_url = "https://mp3.zing.vn/xhr/media/"; // get when check network
  // // with different code we still get code
  // let param_uri = `get-source?type=${type}&key=${code}`;; // get when check network
  // let final_uri = origin_url + param_uri;
  
  // co(function* () {
  //   const response = yield request(final_uri);
  //   const  data  = JSON.parse(response).data;
  //   // data.lyric now is a url
  //   if (!data.lyric.trim()) {
  //     data.lyric = []; // rewrite the {string} url to an array
  //     res.json(data);
  //   }
  //   console.log(data.lyric);
  //   const lrcFile = yield request(data.lyric);
  //   data.lyric = lrcParser(lrcFile).scripts;
  //   res.json(data);
  // })   
  // .then(data => res.json(data))
  // .catch(err => next(err));

  const { title, id } = req.query;

  axios.get(`http://mp3.zing.vn/album/${title}/${id}.html`).then(rawresponse => {
    const html = rawresponse.data;
    const regex = /media\/get-source\?type=album&key=.{33}/; // get the resouce url
    const match = html.match(regex);
    if (!match) throw new Error("can't find the resource URL");
    const [playlistUrl] = match;
    axios.get(`https://mp3.zing.vn/xhr/${playlistUrl}`).then(response => {
      // console.log(response.data.data.items);
      let playlist = {
        album_playlist_thumb:response.data.data.info.thumbnail_medium,
        album_title:response.data.data.info.title,
        artist_thumb: response.data.data.info.thumbnail,
        artist: response.data.data.info.title.artists_names,
        songs: response.data.data.items,
        artist_info: response.data.data.info.title
      };
      return res.json(playlist);
    });      
  })

  // co(function* () {
  //   const html = yield request(`http://mp3.zing.vn/album/${title}/${id}.html`);
  //   const regex = /media\/get-source\?type=album&key=.{33}/; // get the resouce url
  //   const match = html.match(regex);
  //   if (!match) throw new Error("can't find the resource URL");
  //   const [playlistUrl] = match;
    
  //   axios.get(`https://mp3.zing.vn/xhr/${playlistUrl}`).then(response => {
  //     return res.json(JSON.stringify(response.data).data.items);
  //   });
    
    // const parser = new Scraper(html);


    // return yield Promise.all([
    //   request(`https://mp3.zing.vn/xhr/${playlistUrl}`),
    //   promiseParsing(parser),
    // ]);
  // })
  // .then(([playlistRawText, result]) => {
  //   result.songs = JSON.parse(playlistRawText).data.items;
  //   res.json(result);
  // })
  .catch(err => next(err));
};

const promiseParsing = (parser) => {
  return new Promise(resolve, reject => {
    parser
        // .extract('src', '.info-top-play img', 'album_playlist_thumb')
        // .extract('text', '.ctn-inside > h1', 'album_title')
        // .extract('text', '.info-song-top .inline', 'release_year')
        // .extract('text', '.info-artist > h2 > a', 'artist')
        // .extract('src', '.box-artist img', 'artist_thumb')
        .extract('text', '.artist-info-text > p', 'artist_info')
        // .list('.playlist .fn-song')
        // .setKey('song')
        // .extractAttrs(['href', 'href', 'text'], '.item-song h3 .fn-name', ['id', 'alias', 'title'])
        // .artist('.item-song .fn-artist a');
    const result = parser.get();
//    result.genres = [];
    // parser
      // .$('.info-song-top').find('a')
      // prepend album artist to the result
      // .each((index, a) => result.genres.push(parser.$(a).text()));
    resolve(result);
  });
};
