'use client'

import { useReadContract, usePublicClient } from "wagmi";
import NFTMarketPlaceJson from "@/contracts/NFTMarketPlace.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NFTWithMetadata } from "@/types/nft";
import { formatEther } from "viem";

export default function ProfilePage() {
  const {isConnected, address} = useAppKitAccount();
  const [nftList, setNftList] = useState<NFTWithMetadata[]>([]);
  const publicClient = usePublicClient();
  
  const result = useReadContract({
      abi: NFTMarketPlaceJson.abi,
      address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
      functionName: "getAllNFTs", //"getMyNFTs"
      query: {
        enabled: isConnected,
      }
    });
  console.log('profile result = ', result);

  const loadNFTMetadata = async (nfts: NFTWithMetadata[]) => {
      console.log('nfts@@@@@@@@@:', nfts);
      if (!nfts || nfts.length === 0) return;
  
      if (!publicClient) {
        console.error('Public client is not available');
        return;
      }
  
      const nftsWithMetadata: NFTWithMetadata[] = [];
  
      for (const nft of nfts) {
        try {
          const tokenURI = await publicClient.readContract({
            address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
            abi: NFTMarketPlaceJson.abi,
            functionName: 'tokenURI',
            args: [nft.tokenId],
          });
  
          if (tokenURI) {
            const response = await fetch(tokenURI as string);
            const metadata = await response.json();
  
            nftsWithMetadata.push({
              ...nft,
              metadata: metadata,
              imageLoaded: true,
              imageError: false,
            });
          } else {
            nftsWithMetadata.push({
              ...nft,
              imageLoaded: false,
              imageError: true,
            });
          }
        } catch (error) {
          console.error('Error fetching metadata for token', nft.tokenId, error);
          nftsWithMetadata.push({
            ...nft,
            imageLoaded: false,
            imageError: true,
          });
        }
      }
  
      setNftList(nftsWithMetadata);
    };

  useEffect(() => {
    if (result.isSuccess && result.data) {
      loadNFTMetadata(result.data as NFTWithMetadata[]);
    }
  }, [result.isSuccess, result.data]);

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <div className="mb-4">
        <p className="text-1xl font-bold text-center">Wallet Address</p>
        <p className="text-gray-600">{address}</p>
      </div>
      <div className="flex flex-row justify-between items-center w-[380px]">
        <div className="mb-4">
          <p className="text-1xl font-bold text-center">NO. of NFT</p>
          <p className="text-gray-600 text-center">{nftList.length}</p>
        </div>
        <div className="mb-4">
          <p className="text-1xl font-bold text-center">Total Value</p>
          <p className="text-gray-600 text-center">{nftList.filter((nft: any) => nft.currentlyListed).reduce((acc: number, nft: any) => acc + parseFloat(formatEther(nft.price)), 0).toFixed(4)} ETH</p>
        </div>
      </div>
      <div className={`nft-box w-full ${nftList.length < 4 ? 'flex flex-wrap justify-center gap-6' : 'grid grid-cols-4 gap-6'}`}>
        {/* NFT List will be displayed here 只显示图片，名称，价格 */}
        {nftList.map((nft: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="border-4 border-gray-400 rounded-lg overflow-hidden">
              <Image src={nft.metadata?.image || '/placeholder-nft.svg'} alt={nft.metadata?.name || `NFT #${nft.tokenId}`} width={200} height={200} />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-600">{nft.metadata?.name || `NFT #${nft.tokenId}`}</p>
              <p className="font-bold text-gray-600">{nft.price ? `${parseFloat(formatEther(nft.price)).toFixed(4)} ETH` : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}