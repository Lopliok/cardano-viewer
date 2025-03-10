import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../context/Context'
import { AppStore } from '../context/AppStore'
import { apiClient } from '../apiclient'
import Table, { Row } from '../components/Table/Table'
import { useAssetDetails } from '../hooks/useAssetDetails'
import { Link } from 'react-router'
import { convertIpfsUrl } from '../utils/utils'




type WalletAmount = { unit: string, quantity: string }[]

function Home() {
  const [walletAssets, setWalletAssets] = useState<WalletAmount>([])
  useAssetDetails({ assetUnits: walletAssets.map(i => i.unit) })
  const context = useStore<AppStore>()



  const loadAddressDetails = async () => {
    const details = await apiClient.get<any>(`/addresses/${context.state.walletAddress}`)

    const stakeAddress = details.data.stake_address as string
    const amount = details.data.amount as WalletAmount
    setWalletAssets(amount.filter(i => i.unit !== "lovelace"))

    context.setState({ stakeAddress })
  }


  useEffect(() => {
    loadAddressDetails()
  }, [context.state.walletAddress])

  const renderCell = (row: Row, key: keyof Row) => {
    if (key === "image") {
      return <img className='w-10' src={row[key] as string} />
    } else if (key === "unit") {
      return <Link className='font-semibold' to={`unit/${row[key]}`}>{(row[key] as string).slice(0, 20) + "..."}</Link>
    } else if (key === "link") {
      return <Link className='font-semibold' to={`unit/${row[key]}`}>
        <button type="button" className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Asset detail</button>

      </Link>
    } else {
      return row[key]
    }
  }

  const tableData = useMemo(() => {

    if (!context.state.assets || walletAssets.length === 0) {
      return []
    }

    const data = context.state.assets.map((assetData, idx) => {


      const amount = walletAssets?.[idx].quantity
      const unit = walletAssets?.[idx].unit

      return {
        image: convertIpfsUrl(assetData.onchain_metadata?.image ?? ""),
        unit: unit,
        name: assetData.onchain_metadata?.name ?? "",
        amount,
        link: unit
      }
    })
    return data
  }, [walletAssets, context.state.assets])


  return (
    <>
      <Table render={renderCell} data={tableData} />
    </>
  )
}

export default Home
