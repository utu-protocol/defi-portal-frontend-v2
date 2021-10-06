import Home from '../pages/index'
import Defi from '../pages/defi'
import Ocean from '../pages/ocean/index'
import OceanDetail from '../pages/ocean/detail'

export const routes = [
  {
    path: '/defi',
    exact: true,
    component: Defi,
  },
  {
    path: '/ocean',
    exact: true,
    component: Ocean,
  },
  {
    path: '/ocean-market',
    exact: true,
    component: Ocean,
  },
  {
    path: '/ocean/:token',
    // exact: true,
    component: OceanDetail,
  },
  {
    path: '/ocean-market/:token',
    // exact: true,
    component: OceanDetail,
  },
  {
    path: '/',
    exact: true,
    component: Home,
  },
]
