import axios from 'axios';
import * as types from '../constant/action_constant';
import { pageQuery } from '../utils/query';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { startFading, stopFading } from '../actions/ui';

// the POP music type id
let cachedId = 'ZWZB96AB';
/**
 * Default fetch first top 100 us-uk when start web
 * default id: is us-uk 
 */
export function fetchTracks(page, id = 'ZWZB96AB') {
  return dispatch => {
    // make waiting web to fetch, like: loading screen
    dispatch({ type: types.START_FETCHING_TRACKS });
    if (id !== cachedId) {
      dispatch(startFading()); // only fade when fetch new music type
      cachedId = id;
    }
     // fetch top 100 from server
    axios.get(`${MEDIA_ENDPOINT}/top100/${id}${pageQuery(page)}`)
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: types.FETCH_TRACK_SUCCESS, tracks: data.data.items, page, id });
        dispatch(stopFading());
      })
      .catch(() => {
        dispatch({ type: types.FETCH_TRACK_FAILURE });

        if (id !== cachedId) {
          dispatch(stopFading());
        }
      });
  };
}
