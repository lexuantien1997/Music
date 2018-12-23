import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getSongUrl, changeAlias } from '../../utils/func';
import LazyloadImage from '../LazyloadImage';
import PropTypes from 'prop-types';
import CircularProgressbar from "react-circular-progressbar";
import { download } from '../../actions/song';
import { connect } from "react-redux";
import LinksByComma from "../LinksByComma/index";
// const Li = ({ name, id,code, thumbnail, alias, artist, artists, removeSongFromQueue }) => {
//   return (
//     <li>
//       <LazyloadImage
//         src={thumbnail || 'http://zmp3-photo-td.zadn.vn/noimagex'}
//         className="queue-list-thumb"
//       />
//       <div className="queue-list-info">
//         <div className="queue-track-title ellipsis" title={name}>
//           <Link to={getSongUrl(alias || name, id, code)}>{name}</Link>
//         </div>
//         <div className="queue-track-artist ellipsis">
//            {artist || (artists && (Array.isArray(artists) ? artists.map(artist => artist.name).join(', ') : artists))}
//         </div>
//       </div>
//       <div className="queue-track-actions">
//         <i className='ion-android-download'></i>
//         <i className="ion-trash-b" onClick={() => removeSongFromQueue(id)}></i>
//       </div>
//     </li>
//   );
// };


// export default function QueueList({ songs, removeSongFromQueue }) {
//   // console.log(songs);
//   return (
//     <ul className="queue-list">
//       <ReactCSSTransitionGroup
//         transitionName="queue-item"
//         transitionEnterTimeout={500}
//         transitionLeaveTimeout={300}>
//         {songs.map(song =>
//           <Li key={`queue-${song.id}`} {...song} removeSongFromQueue={removeSongFromQueue}/>
//         )}
//       </ReactCSSTransitionGroup>
//     </ul>
//   );
// }


class QueueList extends React.Component { 
  render(){
    const { songs, removeSongFromQueue, download,authenticated, downloadProgress } = this.props;
    return (
      <ul className="queue-list">
        <ReactCSSTransitionGroup
          transitionName="queue-item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {songs.map(song =>
            <Li key={`queue-${song.id}`} downloadProgress={downloadProgress} download = {download} authenticated={authenticated} {...song} removeSongFromQueue={removeSongFromQueue}/>
          )}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    downloadProgress: state.UIState.downloadProgress,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps,
  {
    download
  })(QueueList);

class Li extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { 
      name, 
      id,
      code, 
      thumbnail, 
      alias, 
      artist, 
      artists, 
      removeSongFromQueue ,
      downloadProgress,
      download,
      authenticated
    } = this.props;
    return (
      <li>
        <LazyloadImage
          src={thumbnail || 'http://zmp3-photo-td.zadn.vn/noimagex'}
          className="queue-list-thumb"
        />
        <div className="queue-list-info">
          <div className="queue-track-title ellipsis" title={name}>
            <Link to={getSongUrl(alias || name, id, code)}>{name}</Link>
          </div>
          <div className="queue-track-artist ellipsis">
             {/* {artist || (artists && (Array.isArray(artists) ? artists.map(artist => artist.name).join(', ') : artists))} */}
             <LinksByComma
              className="chart-item-artist ellipsis"
              data={artists}
              definePath={(url) => url.replace('nghe-si', 'artist')}
              pathEntry="link"
              titleEntry="name"
            />
          </div>
        </div>
        <div className="queue-track-actions">
          <button className="sc-ir">
            {
              downloadProgress.isDownloading === true && id === downloadProgress.id
              ? <CircularProgressbar percentage={downloadProgress.percent} />
              : <button className='sc-ir' onClick={()=>{
                if (!authenticated) return this.context.router.push('/login');
                download({ songName: changeAlias(name), id, code });
              }}>
                <i className="ion-android-download" title="download the track" />
              </button>
            }
          </button>
          <i className="ion-trash-b" onClick={() => removeSongFromQueue(id)}></i>
        </div>
      </li>
    );
  }
};



