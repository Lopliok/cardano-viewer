import { useMemo } from 'react'
import { useStore } from '../context/Context'
import { AppStore } from '../context/AppStore'
import Table from '../components/Table/Table'
import { convertIpfsUrl } from '../utils/utils'

function Units() {
  const context = useStore<AppStore>()


  const tableData = useMemo(() => {

    if (!context.state.assets) {
      return []
    }

    const data = context.state.assets.map((assetData) => {


      return {
        image: convertIpfsUrl(assetData.onchain_metadata?.image ?? ""),
        unit: assetData.asset,
        name: assetData.onchain_metadata?.name ?? "",
        link: assetData.asset
      }
    })
    return data
  }, [context.state.assets])


  return (
    <>

      <Table data={tableData ?? []} />

    </>
  )
}

export default Units
