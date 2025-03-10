import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import { useStore } from '../context/Context'
import { AppStore } from '../context/AppStore'
import { apiClient } from '../apiclient'
import { AssetType } from '../types/types'
import { AssetCard } from '../components/Card/AssetCard'

function Unit() {
  const { id } = useParams()
  const context = useStore<AppStore>()

  const loadAsset = async (assetId: string) => {

    try {
      const results = await apiClient.get<AssetType>(`/assets/${assetId}`);
      context.setState({ assets: [...(context.state.assets ?? []), results.data] })
    } catch (error) {
    }
  }

  useEffect(() => {
    if (!context.state.assets?.find(asset => asset.asset === id)) {
      id && loadAsset(id)
    }
  }, [id])

  const singleAsset = useMemo(() => {
    return context.state.assets?.find(asset => asset.asset === id)




  }, [id, context.state.assets])



  return (
    <>
      <AssetCard {...singleAsset as AssetType} />

    </>
  )
}

export default Unit
