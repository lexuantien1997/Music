const { request, spliceOne } = require('utils');

module.exports = function (req, res, next) {
  const { term } = req.query;
  const url = `https://beta.mp3.zing.vn/api/search/multi?q=${term}&ctime=1545563088&sig=422b83451385c3b5d50f6bf70728426877514f8a4032685c99da4993d26c77d4555301d12f92a767ace3cbfae86490b53378b2206d5114e2bea1d2efb2d10b26&api_key=38e8643fb0dc04e8d65b99994d3dafff`;
  request(url)
    .then(data => {
    //  console.log(data);
      data = JSON.parse(data);

      delete data.data.video;

      return res.json(data);

      // spliceOne(data.data, 2); // delete video section

      // data.data = data.data.reduce((newObj, obj) => {
      //   const key = Object.keys(obj)[0];
      //   newObj[key] = obj[key];
      //   return newObj;
      // }, {});

      // if (data.top && data.top.type === 'video') {
      //   // return top result with a blank object if the type is 'video'
      //   data.top = Object.create(null);
      // }

      // res.json(data);
    })
    .catch(err => next(err));
};
