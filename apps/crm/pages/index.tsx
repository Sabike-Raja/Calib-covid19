import React from 'react';
import dynamic from 'next/dynamic'

import Loader from '../components/Loader'

const Dashboard = dynamic(() => import('../containers/Dashboard'), {
  ssr: false,
  loading: () => <Loader />
})

export default Dashboard
