

type AccountType = {
    stake_address?: string
    active?: boolean,
    active_epoch?: string | null,
    controlled_amount?: string,
    rewards_sum?: string,
    withdrawals_sum?: string,
    reserves_sum?: string,
    treasury_sum?: string,
    drep_id?: string,
    withdrawable_amount?: string,
    pool_id?: string
}

const Item = ({ label, value }: { label: string, value: string | boolean | null }) => {
    return (
        <div className="flex text-white justify-between">
            <div className="flex-1 text-right">{label}:</div>
            <div className="flex-1 text-right">{typeof value == "string" ? (value.length > 20 ? value.slice(0, 20) + "..." : value) : value}</div>
        </div>)
}

export const AccountCard = (item: AccountType) => {

    const keys: (keyof AccountType)[] = Object.keys(item) as (keyof AccountType)[];

    return (
        <div className="block p-6 border  rounded-lg shadow-sm  bg-gray-800 border-gray-700 hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">Account detail</h5>
            {keys.map((key) => <Item key={key} label={key} value={item[key] ?? ""} />)}
        </div>)
}