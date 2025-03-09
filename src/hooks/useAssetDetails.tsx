import { useEffect, useState } from "react";
import { apiClient } from "../apiclient";
import { AssetType } from "../types/types";




export const useAssetDetails = ({ assets }: { assets: string[] }) => {

    const [assetDetails, setAssetDetails] = useState<AssetType[]>([])


    const loadAsset = async () => {

        try {
            const results = await Promise.all(assets.map(asset => apiClient.get<AssetType>(`/assets/${asset}`)));
            setAssetDetails(results.map(i => i.data))
        } catch (error) {
        }
    }

    useEffect(() => {

        assets && assetDetails.length == 0 && loadAsset()
    }, [assets])

    return assetDetails
}
