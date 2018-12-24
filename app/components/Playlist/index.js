import React from 'react';
import { Link, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import LinksByComma from '../LinksByComma';
import { getSongUrl, changeAlias } from '../../utils/func';
import './index.sass';
import CircularProgressbar from  "react-circular-progressbar";
import { download } from "../../actions/song";
// props.download({
//   songName: changeAlias(name),
//   id
// })

class Playlist extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props);
    //this.downloadSong=this.downloadSong.bind(this);
  }

  // downloadSong(name,id) {
  //   console.log("--------------------",name,id);
  //   // if (!this.props.authenticated) 
  //   //   return this.context.router.push('/login');
  //   // else 
  //   download({ songName: changeAlias(name), id })
  // }

  render() {
    const { songs, className, pathEntry, downloadProgress, download, authenticated } = this.props;
    console.log(authenticated);
    const page = this.props.location.query.page;
    return (
      <ul className={`${className} playlist-tracks`}>
        {songs.map((song, index) => (
          <li className="playlist-track" key={`playlist-${song.id}`}>
            <span className='playlist-track-order'>
              {page ? (((page - 1) * 20) + index + 1) : (index + 1)}
            </span>
            <div className='playlist-track-title ellipsis'>
            {/* BUG */}
              <Link to={getSongUrl(song[pathEntry] || song.title, song.id, song.code)}>{song.title}</Link>
            </div>
            <div className="playlist-actions">
              {
                downloadProgress.isDownloading === true && song.id === downloadProgress.id
                ? <CircularProgressbar percentage={downloadProgress.percent} />
                : <button className='sc-ir' onClick={()=>{
                  if (!authenticated) return this.context.router.push('/login');
                  download({ songName: changeAlias(song.name), id:song.id, code: song.code });
                }}>
                  <i className="ion-android-download" title="download the track" />
                </button>
              }
              </div>
            <div className="playlist-track-artist">
              {song.artist_text || <LinksByComma
                data={song.artists}
                titleEntry="name"
                // pathEntry="alias"
                // definePath={(alias) => `/artist/${alias}`}
                pathEntry="link"
                definePath={(link) => link.replace('/nghe-si/', '/artist/')}
              />}
              <div>
  
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

// const Playlist = (props) => {
//   const { songs, className, pathEntry, downloadProgress, download } = props;
//   const page = props.location.query.page;
//   console.log(songs);

  
//   return (
//     <ul className={`${className} playlist-tracks`}>
//       {songs.map((song, index) => (
//         <li className="playlist-track" key={`playlist-${song.id}`}>
//           <span className='playlist-track-order'>
//             {page ? (((page - 1) * 20) + index + 1) : (index + 1)}
//           </span>
//           <div className='playlist-track-title ellipsis'>
//           {/* BUG */}
//             <Link to={getSongUrl(song[pathEntry] || song.title, song.id, song.code)}>{song.title}</Link>
//           </div>
//           <div className="playlist-actions">
//             {
//               downloadProgress.isDownloading === true && song.id === downloadProgress.id
//               ? <CircularProgressbar percentage={downloadProgress.percent} />
//               : <button className='sc-ir' onClick={() => 
//                   download({ songName: changeAlias(song.name), id:song.id })}>
//                 <i className="ion-android-download" title="download the track" />
//               </button>
//             }
//             </div>
//           <div className="playlist-track-artist">
//             {song.artist_text || <LinksByComma
//               data={song.artists}
//               titleEntry="name"
//               // pathEntry="alias"
//               // definePath={(alias) => `/artist/${alias}`}
//               pathEntry="link"
//               definePath={(link) => link.replace('/nghe-si/', '/artist/')}
//             />}
//             <div>

//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

Playlist.propTypes = {
  songs: PropTypes.array.isRequired,
  className: PropTypes.string,
  pathEntry: PropTypes.string,
};

export default withRouter(Playlist);
