import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components';
import { changeActiveChart } from '../actions/chart';
import { fetchTracks } from '../actions/home';
import { download } from '../actions/song';

class HomePageContainer extends Component {
  render() {
    return (
      <HomePage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { activeChart } = state.chartState; // current chart id ?
  const { isLoading, tracks } = state.trackState; // tracks data
  const { authenticated } = state.auth; // is authentication or not

  return {
    chart: state.chartState[activeChart], // chart songs -> fix bug later
    downloadProgress: state.UIState.downloadProgress,
    isFading: state.UIState.isFading, // fading when start fetch data
    activeChoiceId: state.trackState.activeId, // current top 100 ?
    isLoading,
    tracks,
    authenticated,
    activeChart
  };
}

export default connect(mapStateToProps,
  {
    changeActiveChart,
    download,
    fetchTracks,
  })(HomePageContainer);

