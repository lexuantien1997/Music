import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Nav, Analyzer } from '../components';
import * as Containers from './';

class App extends React.Component {
  render() {
    const { showPlayer, showAnalyzer: show, showQueue, slideInRight } = this.props;
    const className = `container animated ${slideInRight && 'slideInRight'}`;

    return (
      <div>
      {/* top slider bar : Echo, search, home, chart, ...
        check is login or not
      */}
        <Nav auth={this.props.auth} dispatch={this.props.dispatch} />
        <div className={className}>
          {/* render các component con như album, chart, top 100(home page), ... */}
          {this.props.children}
          {/* ??? */}
          <Analyzer show={show}/>           
        </div>
        {/* danh sách bài hát phía dưới */}
        <Containers.Queue show={showQueue}/>
        {/* player để play, pause, next, back, loop bài hát  */}
        { showPlayer ? <Containers.Player /> : null }
        <Containers.Modal />
        {/* ??? */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
        />
      </div>
    );
  }
}

function mapStateToProps({ songData, UIState, auth }) {
  const { showQueue, showAnalyzer, slideInRight } = UIState;

  return {
    showPlayer: Object.keys(songData.data).length,
    showAnalyzer,
    showQueue,
    slideInRight,
    auth,
  };
}

export default connect(mapStateToProps)(App);
