import { AssetType } from "../types/types";



export interface AppStore {
    walletAddress?: null | string;
    stakeAddress?: null | string;
    assets?: AssetType[];
}