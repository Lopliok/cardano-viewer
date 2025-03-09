import { useEffect, useState } from 'react'
import { useStore } from '../context/Context'
import { AppStore } from '../context/AppStore'
import { apiClient } from '../apiclient'




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
  const [amount, setAmount] = useState<AccountResponse | null>(null)
  const context = useStore<AppStore>()


  const loadAddressDetails = async () => {
    const details = await apiClient.get<AccountResponse>(`/accounts/${context.state.stakeAddress}`)
    const stakeAddress = details.data.stake_address as string

    setAmount(amount)

    context.setState({ stakeAddress })
  }


  useEffect(() => {
    context.state.stakeAddress && loadAddressDetails()
  }, [context.state.stakeAddress])


  return (
    <>

      account

    </>
  )
}

export default Account
