import React, { Component } from 'react';
import "./style.css";
import axios from "axios";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      players: []
    };
  }


  componentDidMount() {
    let urlParams = new URLSearchParams(this.props.location.search);
    if(urlParams.has("name") && urlParams.get("name") != "") {
      axios
      .get("http://localhost:5000/search/" + urlParams.get("name"))
      .then( res => {
        let { data } = res;
        this.setState ({
          players: data
        });
        console.log(data);
      });
    }
  }


  _handleKeyPress (e)  {
    if (e.key === 'Enter') {
      this.setState ({
        players: []
      });
      console.log(this.state.search);
      axios
      .get("http://localhost:5000/search/" + this.state.search)
      .then( res => {
        let { data } = res;
        this.setState ({
          players: data
        });
        console.log(data);
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { players } = this.state;
    return (
      <div id="app">
        <header >
          <h1>UEFA Golden Boot 2017-18</h1>
        </header>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.onChange.bind(this)}
            onKeyPress={this._handleKeyPress.bind(this)}
            placeholder="type name here"
          />
        <ul className="players-list" ref={ul => (this.list = ul)}>
        {players.map(
            ({
              id,
              name: { primaryName, secondaryName },
              club: { crestUrl, clubName },
              playerImgUrl,
              position,
              kitNumber,
              goals,
              playedGames,
              nationality
            }) => (
              <li className="player" key={id}>
                <div className="large player--overlay">
                  <div className="player--overlay--place">{id}</div>
                  <div className="player--overlay--clubcrest">
                    <img src={`${crestUrl}`} alt={`Crest ${clubName}`} />
                  </div>
                </div>
                <div className="half player--img">
                  <img src={`${playerImgUrl}`} alt={`${primaryName}`} />
                </div>
                <div className="half player--card">
                  <div className="player--title">
                    <div className="player--title--secondaryname">
                      {secondaryName}
                    </div>
                    <div className="player--title--primaryname">
                      {primaryName}
                    </div>
                  </div>
                  <div className="player--about">
                    <div className="details">
                      <div className="details--name">club</div>
                      <div className="details--info">{clubName}</div>
                    </div>
                    <div className="details">
                      <div className="details--name">position</div>
                      <div className="details--info">
                        {position.toUpperCase()}
                      </div>
                    </div>
                    <div className="details">
                      <div className="details--name">kit #</div>
                      <div className="details--info">{kitNumber}</div>
                    </div>

                    <div className="details">
                      <div className="details--name">country</div>
                      <div className="details--info">{nationality}</div>
                    </div>
                  </div>
                  <div className="player--stats">
                    <div className="stats">
                      <div className="stats--title">Games </div>
                      <div className="stats--numbers">{playedGames}</div>
                    </div>
                    <div className="stats">
                      <div className="stats--title">Goals </div>
                      <div className="stats--numbers highlight">{goals}</div>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default HomePage;