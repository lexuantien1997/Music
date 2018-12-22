import store from './store';
import { isEmpty, changeAlias } from './utils/func';
import { fetchTracks } from './actions/home';
import { fetchSong, fetchSuggestedSongs } from './actions/song';
import { getChart, changeActiveChart } from './actions/chart';
import { getPlaylistCollection } from './actions/user_playlist';
import { loadUserData } from './localStorage';

// fetch first 20 songs
export function fetchDataForHomePage() {
  const state = store.getState();
  // crawl bảng xếp hạng nước ngoài
  // Only fetch `pop` chart if there isn't one else get it from the state
  // BUG------------------------- => FIX LATER
  if (isEmpty(state.chartState.pop)) {
    store.dispatch(getChart('pop'));
  } else {
    store.dispatch(changeActiveChart('pop'));
  }

    // crawl top 100 us-uk [ lấy trước 20 bài (trang 1) ] 
  if (!state.trackState.tracks.length) {
    // only fetch tracks if there is no trackss in the trackState
    // 1: get page 1 => 20 song
    store.dispatch(fetchTracks(1));
  }
  // ========== PLAY 1st SONG IN LOCAL STORAGE ===============
  // play the first song in the queue saved in localstorage if there is one
  const queueState = state.queueState;
  if (queueState.queue.length && isEmpty(state.songData.data)) {
    const { name, id, alias } = queueState.queue[0];
    store.dispatch(fetchSong(alias || changeAlias(name), id));
    // store.dispatch(fetchSuggestedSongs(id));
  }
  // ========== END PLAY 1st SONG IN LOCAL STORAGE ===============
}

function shouldGetChart(charts, type) {
  if (isEmpty(charts[type])) {
    return true;
  } return false;
}

export function getCharts() {
  const state = store.getState();
  const charts = state.chartState;
  if (shouldGetChart(charts, 'pop')) store.dispatch(getChart('pop'));
  if (shouldGetChart(charts, 'kpop')) store.dispatch(getChart('kpop'));
  if (shouldGetChart(charts, 'vpop')) store.dispatch(getChart('vpop'));
}

export function getPlaylistOnEnter() {
  const userPlaylistCollection = store.getState().playlistState.playlists;

  if (loadUserData() && !userPlaylistCollection.length) {
    store.dispatch(getPlaylistCollection());
  }
}
