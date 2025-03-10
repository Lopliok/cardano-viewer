import { AppStore } from "../../context/AppStore"
import { useStore } from "../../context/Context"

function Header() {
    const context = useStore<AppStore>()


    const onEditAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        context.setState({ walletAddress: formData.get("address") as string, stakeAddress: null, assets: undefined })
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 ">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <div className=" flex-1">
                            Cardano mainnet
                        </div>
                    </div>
                    <div className="flex  flex-1 justify-end">

                        <form onSubmit={onEditAddress} className="flex items-center w-full justify-end">
                            <label htmlFor="address" className=" pt-3 pr-4 block mb-2 text-sm font-medium text-gray-900">Wallet</label>
                            <input type="text" defaultValue="addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[70%]" placeholder="cardano wallet" required />
                            <button type="submit" className="mt-1 ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none ">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
