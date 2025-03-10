import { useEffect, useState } from 'react'
import { useStore } from '../context/Context'
import { AppStore } from '../context/AppStore'
import { apiClient } from '../apiclient'
import { AccountCard } from '../components/Card/AccountCard'




type AccountResponse = {
  active: boolean
  active_epoch: string
  controlled_amount: string
  drep_id: string
  pool_id: string
  reserves_sum: string
  rewards_sum: string
  stake_address: string
  treasury_sum: string
  withdrawable_amount: string
  withdrawals_sum: string
}

function Account() {
  const [accountDetails, setAccountDetails] = useState<AccountResponse | null>(null)
  const context = useStore<AppStore>()


  const loadAddressDetails = async () => {
    const details = await apiClient.get<AccountResponse>(`/accounts/${context.state.stakeAddress}`)

    setAccountDetails(details.data)

  }


  useEffect(() => {
    context.state.stakeAddress && loadAddressDetails()
  }, [context.state.stakeAddress])


  return (
    <>

      <AccountCard {...accountDetails} />

    </>
  )
}

export default Account
