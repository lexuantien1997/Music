import React from 'react';
import Chart from '../../Chart';
import './index.sass';

const ChartPage = ({ pop, kpop, vpop,download, downloadProgress, authenticated }) => {
  return (
    <div className="chart-page">
      <div className="chart-page-chart">
        <Chart  activeChart='pop' download={download} downloadProgress={downloadProgress} authenticated={authenticated} chart={pop} />
      </div>
      <div className="chart-page-chart">
        <Chart activeChart='kpop' download={download} downloadProgress={downloadProgress} authenticated={authenticated} chart={kpop} />
      </div>
      <div className="chart-page-chart">
        <Chart activeChart='vpop' download={download} downloadProgress={downloadProgress} authenticated={authenticated} chart={vpop} />
      </div>
    </div>
  );
};

export default ChartPage;