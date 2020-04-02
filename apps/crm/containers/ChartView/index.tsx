import React, { memo, useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';

import { ChartApiData, CaseTimeSeries } from './IChart'
import ChartView from '../../components/chart'

import './style.scss'

function ChartViewContainer() {
    const [chartLabel, setChartLabel] = useState<string[]>([])
    const [ isLoading, setisLoading ] = useState<boolean>(false)
    const [ month, setMonth ] = useState<string>("March")
    const [caseTimeSeries, setCaseTimeSeries] = useState<CaseTimeSeries[]>([])
    const [ confirmedCase, setConfirmedcase ] = useState<number[]>([])
    const [ recoveredCase, setRecoveredCase ] = useState<number[]>([])
    const [ deceasedCase, setDeceasedCase ] = useState<number[]>([])

    useEffect(() => {
        getStates((data: ChartApiData) => {
            changeChartLabel("March", data.cases_time_series)
            setCaseTimeSeries(data.cases_time_series)
        })
    }, [])

    useEffect(() => {
        changeChartLabel(month, caseTimeSeries)
    }, [isLoading])

    const changeChartLabel = (month: string, caseTimeSeriesData: CaseTimeSeries[]) => {
        const label: string[] = [], confirmed: number[] = [], recovered: number[] = [], deceased: number[] = []
        caseTimeSeriesData.map((mapData: CaseTimeSeries) => {
            const arrayData = mapData.date.split(" ")
            if (arrayData[1].toLowerCase() === month.toLowerCase()) {
                confirmed.push(parseInt(mapData.totalconfirmed))
                recovered.push(parseInt(mapData.totalrecovered))
                deceased.push(parseInt(mapData.totaldeceased))
                label.push(`${arrayData[0]} ${arrayData[1].slice(0, 3)}`)
            }
        })
        setConfirmedcase(confirmed)
        setRecoveredCase(recovered)
        setDeceasedCase(deceased)
        setChartLabel(label)
        setisLoading(true)
    }

    const getStates = async (callback: Function) => {
        try {
            const [response] = await Promise.all([
                axios.get('https://api.covid19india.org/data.json'),
            ]);
            console.log('sucess', response)
            callback(response.data)
        } catch (err) {
            console.log(err);
        }
    };

    const changeMonth = (e: any) => {
        console.log('csdkclsnl', e)
        setMonth(e.value)
        setisLoading(false)
    }

    return (
        <Fragment>
            <div style={{ width: '10%' }}>
                <Dropdown options={["January", "February", "March", "April"]} onChange={(e) =>changeMonth(e)} value={month} placeholder="Select an month" />
            </div>
            {isLoading ? <ChartView chartLabel={chartLabel} confirmedCase={confirmedCase} recoveredCase={recoveredCase} deceasedCase={deceasedCase} /> : null}
        </Fragment>
    )
}

export default memo(ChartViewContainer)