import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';
import { haveDropDown } from '../../HOC';

class TrackList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  downloadSong(criteria) {
    console.log(JSON.stringify(criteria));
    // only login -> can download track items
    if (!this.props.authenticated) {
      return this.context.router.push('/login');
    }
    return this.props.download(criteria);
  }

  render() {
    const { isFading } = this.props;

    return (
      <div className='hp-track-list-wrapper'>
        <ul className={`hp-track-list ${isFading ? 'isFading' : ''}`}>
        {/* Each track items is a song */}
          { this.props.tracks.map(track =>
            <Track
              key={track.id}
              {...track}
              {...this.props}
              download={this.downloadSong.bind(this)} // download track items
            />)
          }
          {/* For loading when fetching data */}
          { this.props.isLoading && <div className='loader'></div> }
        </ul>
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  renderDropDown: PropTypes.func.isRequired,
};

export default haveDropDown(TrackList);

