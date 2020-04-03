import React from 'react';
import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('../containers/Dashboard'), {
  ssr: false,
  loading: () => <div> Loading... </div>
})

export default Dashboard
