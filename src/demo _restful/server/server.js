// Import express
const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
// Initialize the app
const app = express();

// Setup server port
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const user = {
  username: "tienlx97",
  password: "25101997"
}

const Golden_Boot = {
  players: [
    {
      id: 1,
      name: { primaryName: "Messi", secondaryName: "Lionel" },
      club: {
        crestUrl:
          "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
        clubName: "FC Barcelona"
      },
      playerImgUrl:
        "https://media-public.fcbarcelona.com/20157/0/document_thumbnail/20197/49/219/190/96394033/1.0-1/96394033.jpg?t=1534859847000",
      position: "fr",
      kitNumber: "10",
      goals: 45,
      playedGames: 54,
      age: 31,
      winner: true,
      nationality: "argentina"
    },
    {
      id: 2,
      name: { primaryName: "Salah", secondaryName: "Mohamed " },
      club: {
        crestUrl:
          "https://upload.wikimedia.org/wikipedia/vi/thumb/0/0c/Liverpool_FC.svg/220px-Liverpool_FC.svg.png",
        clubName: "Liverpool"
      },
      playerImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/200px-Mohamed_Salah_2018.jpg",
      position: "fr",
      kitNumber: "10",
      goals: 32,
      playedGames: 54,
      age: 31,
      winner: false,
      nationality: "Egypt"
    },
    {
      id: 2,
      name: { primaryName: "Kane", secondaryName: "Hary " },
      club: {
        crestUrl:
          "https://upload.wikimedia.org/wikipedia/vi/thumb/8/81/Tottenham_Hotspur_FC.png/120px-Tottenham_Hotspur_FC.png",
        clubName: "Tottenham "
      },
      playerImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Harry_Kane_in_Russia_2.jpg/200px-Harry_Kane_in_Russia_2.jpg",
      position: "st",
      kitNumber: "10",
      goals: 32,
      playedGames: 54,
      age: 25,
      winner: false,
      nationality: "England"
    },
    {
      id: 2,
      name: { primaryName: "Kane", secondaryName: "Hary " },
      club: {
        crestUrl:
          "https://upload.wikimedia.org/wikipedia/vi/thumb/8/81/Tottenham_Hotspur_FC.png/120px-Tottenham_Hotspur_FC.png",
        clubName: "Tottenham "
      },
      playerImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Harry_Kane_in_Russia_2.jpg/200px-Harry_Kane_in_Russia_2.jpg",
      position: "st",
      kitNumber: "10",
      goals: 32,
      playedGames: 54,
      age: 25,
      winner: false,
      nationality: "England"
    }
  ]
}


const data  = {
  success: true,
  error: ""
  
};

app.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if(username == user.username && password == user.password) {
    return res.status(200).json(data);
  } else {
    data.success = false;
    data.error = "wrong email and password";
    return res.status(200).json(data);
  }
});

app.get('/search/:primaryName', (req, res) => {  
  const { primaryName, } = req.params;
  console.log(primaryName);
  let datas = [];
  if(primaryName == "allplayer") {
    datas = Golden_Boot.players;
  } else {
    Golden_Boot.players.forEach ( r => {
      if(r.name.primaryName== primaryName)
        datas.push(r);
    });
  }

  res.send(datas);
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});