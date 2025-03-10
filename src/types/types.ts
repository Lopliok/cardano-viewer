
interface Metadata {
    name: string;
    files?: { src: string; mediaType: string }[];
    image: string;
    copyright?: string;
    mediaType?: string;
    description?: string;
    web?: string;
    website?: string;
}

export interface AssetType {
    asset: string;
    asset_name: string;
    fingerprint: string;
    initial_mint_tx_hash: string;
    metadata: any | null;
    mint_or_burn_count: number;
    onchain_metadata: Metadata | null;
    onchain_metadata_extra: any | null;
    onchain_metadata_standard: string;
    policy_id: string;
    quantity: string;
}