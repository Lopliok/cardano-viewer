


export const convertIpfsUrl = (ipfsUrl: string): string => {
    const url = Array.isArray(ipfsUrl) ? ipfsUrl[0] : ipfsUrl

    return url.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/")
};