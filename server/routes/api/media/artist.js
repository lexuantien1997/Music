
const PageScraper = require('lib/PageScraper');
const { request } = require('utils');
const cheerio = require('cheerio');
const axios = require('axios');

const rq = (type, name, page) => {
  if (page) {
    return request(`http://mp3.zing.vn/nghe-si/${name}/${type}?&page=${page}`);
  }

  return request(`http://mp3.zing.vn/nghe-si/${name}/${type}`);
};

module.exports = function getArtist(req, res, next) {
  const { name, type } = req.params;
  const { page } = req.query;

  switch (type) {
  case 'albums':
    getAlbums(name, res);
    break;

  case 'songs':
    getSongs(name, page, res, next);
    break;

  case 'biography':
    getBio(name, res, next);
    break;

  default:
  }
};

const getSongs = (name, page, res, next) => {
  rq('bai-hat', name, page)
    .then(async (html) => {
       // view-source:https://mp3.zing.vn/nghe-si/Olly-Murs/bai-hat
      // query: data-code
      // https://mp3.zing.vn/xhr/media/get-source?type=audio&key=data-code
      //  => mảng data
      let listData = [] // mảng data
      let avatar = ""
      let cover = ""
      let artistName = ""
      let numberOfPages = 1
      //console.log(html);
      let regexDataCode = /data-code="([\s\S]*?)"/g;
      let listDataCode = html.toString().match(regexDataCode);
      //#region get cover and avatar image
      let regexFullBanner = /<div class="full-banner">([\s\S]*?)<\/div>/i
      let fullBanner = html.toString().match(regexFullBanner);
      let regexCoverImage = /<img src="([\s\S]*?)"/i
      cover = fullBanner[1].toString().match(regexCoverImage)[1]
      let regexAvatar = /src="([\s\S]*?)"/ig
      avatar = fullBanner[1].toString().match(regexAvatar)[1].toString().replace('src="', "").replace('"', "")
      let regexSingerName = /<h1>([\s\S]*?)<\/h1>/i
      artistName = fullBanner[1].toString().match(regexSingerName)[1]
      //console.log(fullBanner[1]);
      console.log(cover)
      console.log(avatar)
      console.log(artistName)
      //#endregion
      
      //#region get number of Page
      let regexListPage = /<div class="pagination">([\s\S]*?)<\/div>/i
      let listPageStr = html.toString().match(regexListPage)[1].toString().replace('<ul>', "").replace("</ul>", "").trim()
      let regexListPageLi = /<li>([\s\S]*?)<\/li>/ig
      let listPageLi = listPageStr.match(regexListPageLi)
      let regexPageNum = /page=([\s\S]*?)"/i
      numberOfPages = listPageLi[listPageLi.length - 1].toString().match(regexPageNum)[1]
      console.log("number of page: " + numberOfPages)
      //#endregion
      console.log(listDataCode);

      for(let i = 0; i < listDataCode.length; i++){
        await axios.get('https://mp3.zing.vn/xhr/media/get-source?type=audio&key=' + listDataCode[i].toString().replace('data-code="', "").replace("", ""))
        .then(response => {
            //console.log(response.data.data);
            if (avatar == ""){
              avatar = response.data.data.artist.thumbnail
            }
            if(cover == ""){
              cover = response.data.data.artist.cover
            }
            if (artistName == ""){
              artistName = response.data.data.artists_names
            }
            let songInfo = {
              id: response.data.data.id,
              code: response.data.data.code,
              alias: response.data.data.link.toString().split('/')[2],
              title: response.data.data.title,
              artist_text: response.data.data.artists_names
            }
            //console.log(songInfo);
            listData.push(response.data.data)
        });
      }
      let data = {
        avatar: avatar,
        cover: cover,
        artistName: artistName,
        numberOfPages: numberOfPages,
        songs: listData
      }
      // console.log(data)
      //////////////////////////////////
      // const parser = new PageScraper(html);
      // parser
      // .paginate();
      // // .extract('src', '.box-info-artist img', 'avatar')
      // //   .extract('src', '.container > img', 'cover')
      // //   .extract('text', '.info-summary > h1', 'artistName')
      // //   .list('.group.fn-song')
      // //   .setKey('song')
      // //   .extractAttrs(['href', 'href'], '._trackLink', ['id', 'alias'])
      // //   .extractAttr('text', '._trackLink', 'title', string => {
      // //     return string.replace(/\s*-\s*.+/g, '');
      // //   })
      // //   .extractAttr('text', '._trackLink span', 'artist_text')
      return res.json(data);

    })
    .catch(err => next(err));
};

const getAlbums = (name, res, next) => {
  rq('album', name)
    .then(html => {
      const parser = new PageScraper(html);

      parser
        .extract('src', '.box-info-artist img', 'avatar')
        .extract('src', '.container > img', 'cover')
        .extract('text', '.info-summary > h1', 'artistName')
        .setRoot('.wrap-content')
        .list('.album-item')
        .setKey('album')
        .extractAttr('src', 'img', 'thumb')
        .extractAttr('text', '.title-item.txt-primary', 'title')
        .extractAttr('text', 'h4.title-sd-item.txt-info', 'artist_text')
        .extractAttrs(['href', 'href'], '.thumb._trackLink', ['alias', 'id'])
        .paginate();

      res.json(parser.get());
    })
    .catch(err => next(err));
};

const getBio = (name, res, next) => {
  rq('tieu-su', name)
    .then(html => {
      const result = {
        fullName: '',
        dateOfBirth: '',
        genres: [],
        country: '',
        description: '',
      };

      const $ = cheerio.load(html);
      const $entry = $('.col-12 .entry');
      const $li = (i) => $entry.find('.hoz-list li').eq(i);

      const avatar = $('.box-info-artist img').attr('src');
      const cover = $('.container > img').attr('src');
      const artistName = $('.info-summary > h1').text();
      const description = $entry.contents().not('.hoz-list').text().trim();
      const fullName = $li(0).text().replace(/.+:/, '').trim();
      const dateOfBirth = $li(1).text().replace(/.+:/, '').trim();
      const country = $li(3).text().trim();

      $li(2).find('a').each((index, value) => {
        result.genres.push($(value).text().trim());
      });

      res.json(Object.assign(result, {
        avatar,
        cover,
        description,
        fullName,
        dateOfBirth,
        country,
        artistName,
      }));
    })
    .catch(err => next(err));
};

