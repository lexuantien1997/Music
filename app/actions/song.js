import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constant/action_constant';
import { ROOT_URL, MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { togglePushRoute } from './queue';
import {
  startDownloading,
  updateDownloadProgress,
  finishDownloading,
} from './ui';

export function fetchSong(name,id, code) {
  return dispatch => {
    dispatch({ type: types.START_FETCHING_SONG });
    if(code) {
      axios.get(`/api/media/song?name=${name}&code=${code}`)
      .then(({ data }) => {
        data.cover = data.artist.cover;
        const ids = {
          songId: data.id,
          artistId: data.artist.id,
        };
        dispatch(fetchSuggestedSongs(ids));
  
        delete data.artist;
        dispatch({ type: types.FETCH_SONG_SUCCESS, data });
        dispatch(togglePushRoute(false));
        dispatch({ type: types.ADD_SONG_TO_QUEUE,
          song: { name: data.name, id, artists: data.artists, thumbnail: data.thumbnail, code: data.code },
        });
      })
      .catch(err => {
        console.log(err);
  
        dispatch({ type: types.FETCH_SONG_FAILURE });
        browserHistory.push('/notfound/song');
      });
    }
  };
}

export function fetchSuggestedSongs({ songId, artistId }) {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/suggested-song?artistId=${artistId}&songId=${songId}`)
      .then(({ data }) => dispatch({
        type: types.FETCH_SUGGESTED_SONG_SUCCESS,
        songs: data.data.items,
      }))
      .catch(err => dispatch({
        type: types.FETCH_SUGGESTED_SONG_FAILURE,
      }));
  };
}

export function download({ songName, id, code,filename }) {
  return dispatch => {

    console.log(songName,id);

    dispatch(startDownloading(id)); // dispatch the action for showing loading progress bar

    const url = filename ? `${ROOT_URL}/download/song/${songName}/${id}/${filename}` :
      `${ROOT_URL}/download/song/${songName}/${id}/${code}`;

    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      onDownloadProgress: progressEvent => {
        const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        // do whatever you like with the percentage complete
        // maybe dispatch an action that will update a progress bar or something
        dispatch(updateDownloadProgress(percentCompleted));
      },
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${songName}.mp3`;
        link.click();

        dispatch(finishDownloading());
      })
    .catch(err => { throw err; });
  };
}
