import axios from 'axios';
import * as types from '../constant/action_constant';

const popTypes = {
  //pop: 'IWZ9Z0BW',
  pop: 'ZGJHtLkHChZdNAuyGyDmLHtkWApWWHLau',
  kpop: 'ZncGyZLmCzJNRmbyGyvHLnyZpSQQpAnCS',
  vpop: 'ZGcmykknXSNsCSgyHtvHkmyLpAppWBVSE',
};

// get chart uPop - vpop - kpop
export function getChart(popType) {
  return dispatch => {
    console.log("popType: " + popType)
    console.log("poptype: " + popTypes[popType])

    axios.get(`https://mp3.zing.vn/xhr/media/get-source?type=album&key=${popTypes[popType]}`)
      .then(({ data: res }) => {
        console.log("res: " + res.data)
        if (res.msg === 'Success') {
          switch (popType) {
          case 'pop':
            dispatch({ type: types.FETCH_POP_CHART, pop: res.data });
            break;

          case 'kpop':
            dispatch({ type: types.FETCH_KPOP_CHART, kpop: res.data });
            break;

          case 'vpop':
            dispatch({ type: types.FETCH_VPOP_CHART, vpop: res.data });
            break;

          default:
            break;
          }
        }
      })
      .catch(err => { throw err; });
  };
}

export function changeActiveChart(popType) {
  return (dispatch, getState) => {
    const state = getState();

    if (Object.keys(state.chartState[popType]).length) {
      dispatch({ type: types.CHANGE_ACTIVE_CHART, activeChart: popType });
    } else {
      dispatch(getChart(popType));
    }
  };
}
