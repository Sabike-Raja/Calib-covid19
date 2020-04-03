import React, { memo, Fragment, useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import Router from 'next/router'

import { formatDate, formatDateAbsolute } from '../../utils';
import QuickView from '../../components/quickView'
import { States, Deltas } from '../../components/quickView/IQuickView'

// import './style.scss'

function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [states, setStates] = useState<States[]>([]);
  const [deltas, setDeltas] = useState<Deltas>({
    confirmeddelta: '',
    counterforautotimeupdate: '',
    deceaseddelta: '',
    lastupdatedtime: '',
    recovereddelta: '',
    statesdelta: ''
  });

  useEffect(() => {
    getStates()
  }, [])
  
  const getStates = async () => {
    try {
      const [response, stateDistrictWiseResponse] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
      ]);
      setStates(response.data.statewise);
      //   setTimeseries(response.data.cases_time_series);
      // console.log('sucess', response.data.statewise[0].lastupdatedtime)
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setDeltas(response.data.key_values[0]);
      //   setStateDistrictWiseData(stateDistrictWiseResponse.data);
      //   setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = (link: string) => {
    Router.push(link)
  }

  return (
    <Fragment>
      <div className="m-60">
        <div className="main-heading">
          <h1>India COVID-19 Live Update Here</h1>
          <div className="last-update">
            <h6>Last Updated</h6>
            <h6 style={{ color: '#28a745', fontWeight: 600 }}>
              {isNaN(Date.parse(formatDate(lastUpdated)))
                ? ''
                : formatDistance(
                  new Date(formatDate(lastUpdated)),
                  new Date()
                ) + ' Ago'}
            </h6>
            <h6 style={{ color: '#28a745', fontWeight: 600 }}>
              {isNaN(Date.parse(formatDate(lastUpdated)))
                ? ''
                : formatDateAbsolute(lastUpdated)}
            </h6>
          </div>
        </div>
        <div className="cen">
          <QuickView data={states} deltas={deltas} />
        </div>
        <div className="cen">
          <p className="font-style"> If you want to see full details </p>
          <p className="font-style"><span onClick={() => navigate("/table-view")}> clcik here </span> for table view</p>
          <p className="font-style"><span onClick={() => navigate("/map-view")}> clcik here </span>for map view</p>
          <p className="font-style"><span onClick={() => navigate("/chart-view")}> clcik here </span>for chart view</p>
        </div>
      </div>
    </Fragment>
  )
}

export default memo(Dashboard)
