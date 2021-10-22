/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useMemo } from 'react'

import Table from '../../components/Table';
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAssets } from '../../redux/actions/ocean.actions'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom';

export const Ocean = (): ReactElement => {
  const dispatch = useDispatch()
  const { assets, loading } = useSelector((state: any) => ({
    assets: state.ocean.assets,
    loading: state.ocean.loading,
  }))
  useEffect(() => {
    dispatch(fetchAssets())
  }, []);


  const data = useMemo(
    () => {
      return assets.map(({ entity, summaryText }: any) => ({
        col1: {
          name: entity.name,
          address: entity.ids.address_datatoken,
          publisher: entity.properties.PublishedBy
        },
        col2: entity.properties.Purgatory ? 1 : 0,
        col3: entity.properties.PublishedBy,
        col4: summaryText,
        col5: entity.properties.Consumed,
      }))
    },
    [assets]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        id: 'name',
        accessor: 'col1',
        Cell: ({ value }: any) => {
          return (<Link to={`/ocean-market/${value.address}`}>
            <div className="text-sm font-medium text-gray-900">{value.name}</div>
            <div className="text-sm text-gray-500">{value.publisher}</div>
          </Link>)
        }
      },
      {
        id: 'status',
        Header: 'Status',
        accessor: 'col2',
        Cell: ({ value }: any) => {
          return (<>
            <span
              className={
                !value
                  ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                  : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
              }
            >
              {!value ? 'Active' : 'Purgatory'}
            </span>
          </>)
        }
      },
      {
        id: 'publisher',
        Header: 'Publisher',
        accessor: 'col3',
      },
      {
        id: 'your-network',
        Header: 'Your Network',
        accessor: 'col4',
        highlight: true,
      },
      {
        id: 'times-consumed',
        Header: 'Times Consumed',
        accessor: 'col5',
      }
    ],
    []
  );

  return (
    <Layout title="Ocean Market">
      {loading && (!assets || !assets.length) ? (
        <div className="flex flex-col max-w-7xl  px-8 mt-8  mx-auto ">
          <Loader />{' '}
        </div>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </Layout>
  )
}

export default Ocean
