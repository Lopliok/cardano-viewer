import { useEffect } from "react";
import { apiClient } from "../apiclient";
import { AssetType } from "../types/types";
import { useStore } from "../context/Context";
import { AppStore } from "../context/AppStore";




export const useAssetDetails = ({ assetUnits }: { assetUnits: string[] }) => {
    const context = useStore<AppStore>()



    const loadAsset = async () => {

        try {
            const results = await Promise.all(assetUnits.map(asset => apiClient.get<AssetType>(`/assets/${asset}`)));
            context.setState({ assets: results.map(i => i.data) })
        } catch (error) {
        }
    }

    useEffect(() => {
        assetUnits.length > 0 && !context.state.assets && loadAsset()
    }, [assetUnits])

    useEffect(() => {
        context.setState({ assets: undefined })
    }, [context.state.walletAddress])

}
