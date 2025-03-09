import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../context/Context'
import { AppStore } from '../context/AppStore'
import { apiClient } from '../apiclient'
import Table, { Row } from '../components/Table/Table'
import { useAssetDetails } from '../hooks/useAssetDetails'

const convertIpfsUrl = (ipfsUrl: string): string => {
  console.log(ipfsUrl)
  const url = Array.isArray(ipfsUrl) ? ipfsUrl[0] : ipfsUrl

  return url.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/")
};


type WalletAmount = { unit: string, quantity: string }[]

function Home() {
  const [walletAssets, setWalletAssets] = useState<WalletAmount>([])
  const context = useStore<AppStore>()
  const assets = useAssetDetails({ assets: walletAssets.map(i => i.unit) })


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
    } else {
      return row[key]
    }
  }

  const tableData = useMemo(() => {

    const data = assets.map((assetData, idx) => {

      const amount = walletAssets?.[idx].quantity
      const unit = walletAssets?.[idx].unit

      return {
        image: convertIpfsUrl(assetData.onchain_metadata?.image ?? ""),
        unit: unit.slice(0, 20) + "...",
        name: assetData.onchain_metadata?.name ?? "",
        amount
      }
    })
    return data
  }, [walletAssets, assets])


  return (
    <>

      <Table render={renderCell} data={tableData} />

    </>
  )
}

export default Home
