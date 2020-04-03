import React from 'react'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('../containers/MapView'), {
  ssr: false,
  loading: () => <div> Loading... </div>
})

export default MapView
