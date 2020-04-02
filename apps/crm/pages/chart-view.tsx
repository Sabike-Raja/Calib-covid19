import React from 'react'
import dynamic from 'next/dynamic'

const ChartView = dynamic(() => import('../containers/ChartView'), {
  ssr: false,
  loading: () => <div> Loading... </div>
})

export default ChartView
