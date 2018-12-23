import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import WithBackgroundImage from '../WithBgImg';
import LinksByComma from '../LinksByComma';
import { haveDropDown } from '../../HOC';
import './index.sass';
import CircularProgressbar from "react-circular-progressbar";
const Chart = (props) => {
  const { chart, download, authenticated } = props;
  if (!chart.items) {
    return null;
  }

  return (
    <div className="chart">
      <WithBackgroundImage className="featured-image" src={chart.items[0].thumbnail} />
      <ul className="chart-list">
        {
          chart.items.map((item, index) => {
            if (index === 0) {
              return <ChartFirstItem key={`chart-${item.id}`} authenticated= {authenticated} download = {download} {...item} {...props}/>;
            }
            return <ChartItem key={`chart-${item.id}`} {...item} authenticated= {authenticated} download = {download} {...props}/>;
          })
        }
      </ul>
    </div>
  );
};

Chart.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
};

class ChartItem extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { 
      downloadProgress,
      download,
      name, 
      order, 
      id, 
      thumbnail, 
      artists, 
      renderDropDown, 
      toggleTrackDropDown, 
      code ,
      authenticated
    } = this.props;
    return (
      <li className="chart-item">
        <div className="chart-item-thumb">
          <img src={thumbnail} />
        </div>
        <div className="chart-item-detail">
          <div className="chart-item-detail-left">
            <div className="chart-item-order">{order}</div>
            <div className="chart-item-info">
              <div className="chart-item-title ellipsis" title={name}>
                <Link to={`/song/${changeAlias(name)}/${id}/${code}`}>{name}</Link>
              </div>
              <LinksByComma
                className="chart-item-artist ellipsis"
                data={artists}
                pathEntry="link"
                titleEntry="name"
                definePath={(url) => url.replace('nghe-si', 'artist')}
                defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
              />
            </div>
          </div>
          <div className="chart-item-detail-right">
            <button className="sc-ir">
              {
                downloadProgress.isDownloading === true && id === downloadProgress.id
                ? <CircularProgressbar percentage={downloadProgress.percent} />
                : <button className='sc-ir' onClick={()=>{
                  if (!authenticated.authenticated) return this.context.router.push('/login');
                  download({ songName: changeAlias(name), id, code });
                }}>
                  <i className="ion-android-download" title="download the track" />
                </button>
              }
            </button>
            <button
              className="sc-ir ignore-react-onclickoutside"
              onClick={() => toggleTrackDropDown(id, 'Chart')}
            >
              <i className="ion-more"></i>
            </button>
          </div>
        </div>
        { renderDropDown('Chart', { name, id, artists, thumbnail,code }) }
      </li>
    );
  }
}

class ChartFirstItem extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { 
      downloadProgress,
      download,
      name, 
      order, 
      id, 
      thumbnail, 
      artists, 
      renderDropDown, 
      toggleTrackDropDown, 
      code ,
      authenticated
    } = this.props;
    return (
      <li className="chart-item">
        <div className="chart-item-order order-first">
          { order }
        </div>
        <div className="chart-item-detail detail-first">
          <div className="chart-item-detail-left">
            <div className="chart-item-title ellipsis" title={name}>
              <Link to={`/song/${changeAlias(name)}/${id}/${code}`}>{name}</Link>
            </div>
            <LinksByComma
              className="chart-item-artist ellipsis"
              data={artists}
              definePath={(url) => url.replace('nghe-si', 'artist')}
              defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
              pathEntry="link"
              titleEntry="name"
            />
          </div>
          <div className="chart-item-detail-right">
            <button className="sc-ir">
              {
                downloadProgress.isDownloading === true && id === downloadProgress.id
                ? <CircularProgressbar percentage={downloadProgress.percent} />
                : <button className='sc-ir' onClick={()=>{
                  if (!authenticated.authenticated) return this.context.router.push('/login');
                  download({ songName: changeAlias(name), id, code });
                }}>
                  <i className="ion-android-download" title="download the track" />
                </button>
              }
            </button>
            <button
              className="sc-ir ignore-react-onclickoutside"
              onClick={() => toggleTrackDropDown(id, 'Chart')}
            >
              <i className="ion-more"></i>
            </button>
          </div>
        </div>
        { renderDropDown('Chart', { name, id, artists, thumbnail, code }) }
      </li>
    );
  }
}

ChartFirstItem.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
};

ChartItem.propTypes = {
  renderDropDown: PropTypes.func.isRequired,
  toggleTrackDropDown: PropTypes.func.isRequired,
};

export default haveDropDown(Chart);
