import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { getChart } from '../actions/chart';
import { download } from '../actions/song';

class ChartPage extends Component {
  render() {
    return (
      <Pages.ChartPage
        pop={this.props.pop}
        kpop={this.props.kpop}
        vpop={this.props.vpop}
        download={this.props.download}
        downloadProgress={this.props.downloadProgress}
        authenticated={this.props.authenticated}
      />
    );
  }
}

function mapStateToProps(state) {
  return state.chartState;
}
function mapStateToProps(state) {
  const { activeChart } = state.chartState; // current chart id ?
  const { pop, kpop, vpop } = state.chartState; // current chart id ?
  const { authenticated } = state.auth; // is authentication or not

  return {
    downloadProgress: state.UIState.downloadProgress,
    authenticated,
    pop, kpop, vpop
  };
}

export default connect(mapStateToProps,
  {
    download,
    getChart
  })(ChartPage);