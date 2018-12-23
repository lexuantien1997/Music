import React from 'react';
import { Link } from 'react-router';
import { getSongUrl } from '../../utils/func';

function SongResult(props) {
  console.log("song result", props);
  return (
    <ul className='song-result'>
      <div className='search-li-title search-song-title'>
        Songs
      </div>
      { 
        props.songs.items.map(song=> (
          <li key={`song-result${song.id}`}>
            <div className='search-li-detail search-song-detail'>
              <div className='search-li-info search-song'>
                <div>
                  <Link
                    to={getSongUrl(song.alias, song.id)}
                    onClick={() => clearSearchResult()}
                  >{song.title}</Link>
                </div>
                <div className='search-li-artist'>
                  { song.artist }
                </div>
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default SongResult;
