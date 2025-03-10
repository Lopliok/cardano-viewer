import { AssetType } from "../../types/types";
import { convertIpfsUrl } from "../../utils/utils";




const Item = ({ label, value, cut = true }: { label: string, value: string | boolean | null, cut?: boolean }) => {
    return (
        <div className="flex text-white justify-between">
            <div className="flex-1 text-right">{label}:</div>
            <div className="flex-1 text-right">{typeof value == "string" ? ((cut && value.length > 20) ? value.slice(0, 20) + "..." : value) : value}</div>
        </div>)
}

export const AssetCard = (item: AssetType) => {


    const { onchain_metadata, ...assetData } = item
    const keys: (keyof AssetType)[] = Object.keys(assetData) as (keyof AssetType)[];


    return (<div className="flex flex-col space-y-4">

        <div className="block p-6 border  rounded-lg shadow-sm  bg-gray-800 border-gray-700 hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">Asset info</h5>
            <div className="flex justify-evenly">
                <img className="w-30" src={convertIpfsUrl((onchain_metadata?.image) ?? "")} />
                <div className="flex-1">
                    <Item label="Description" value={onchain_metadata?.description ?? ""} />
                    <Item label="Website" cut={false} value={onchain_metadata?.web ?? onchain_metadata?.website ?? ""} />

                </div>


            </div>
        </div>
        <div className="block p-6 border  rounded-lg shadow-sm  bg-gray-800 border-gray-700 hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">Details</h5>
            {keys.map((key) => <Item key={key} label={key} value={item[key] ?? ""} />)}
        </div>
    </div>)
}