'use client'

import { useSearchParams } from 'next/navigation';
import { useReadContract, usePublicClient, useWriteContract,useWaitForTransactionReceipt, type BaseError } from "wagmi";
import NFTMarketPlaceJson from "@/contracts/NFTMarketPlace.json";
import { useEffect, useState } from 'react';
import { NFTMetadata, NFTWithMetadata } from "@/types/nft";
import Image from "next/image";
import { formatEther } from 'viem';
import { useAppKitAccount } from "@reown/appkit/react";

export default function NFTDetail() {
  const searchParams = useSearchParams();
  const tokenId = searchParams.get('tokenId');
  const [nftWithMetadata, setNftWithMetadata] = useState<NFTWithMetadata | null>(null);
  const publicClient = usePublicClient();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const {address, isConnected} = useAppKitAccount();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });

  console.log('NFTDetail tokenId = ', tokenId); //getListedTokenForId
  const listedToken = useReadContract({
    address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
    abi: NFTMarketPlaceJson.abi,
    functionName: 'getListedTokenForId',
    args: [tokenId],
    query: {
      enabled: isConnected,
    }
  });
  console.log('NFTDetail listedToken = ', listedToken);

  const loadMetadata = async (listedNTF: NFTWithMetadata) => {
    if (!publicClient) {
      console.error('Public client is not available');
      return;
    }
    try {
      const tokenURIResult = await publicClient.readContract({
        address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
        abi: NFTMarketPlaceJson.abi,
        functionName: 'tokenURI',
        args: [listedNTF.tokenId],
      }) as string;
      console.log('NFTDetail loadMetadata tokenURIResult = ', tokenURIResult);
      
      if (tokenURIResult) {
        const response = await fetch(tokenURIResult);
        const nftMetadata = await response.json() as NFTMetadata;
        console.log('NFTDetail nftMetadata = ', nftMetadata);
        listedNTF.metadata = nftMetadata;
        console.log('NFTDetail listedNTF with metadata = ', listedNTF);
        setNftWithMetadata(listedNTF);
      }
    } catch (error) {
      console.error('Error loading metadata:', error);
    }
  }
  useEffect(() => {
    if (listedToken.isSuccess && listedToken.data) {
      console.log('NFTDetail listedToken data = ', listedToken.data);
      loadMetadata(listedToken.data as NFTWithMetadata);
    }
  }, [listedToken.isSuccess, listedToken.data]);

  const handleBuyNow = async () => {
    if (!nftWithMetadata) {
      console.error('No NFT metadata available');
      return;
    }
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
        abi: NFTMarketPlaceJson.abi,
        functionName: 'executeSale',
        args: [nftWithMetadata.tokenId],
        value: BigInt(nftWithMetadata.price.toString()),
      });
      console.log('NFTDetail executeSale transaction sent');
    } catch (error) {
      console.error('Error executing sale:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-8 ml-[-500px] mt-[-150px]">
      {listedToken.isLoading ? (
        <div className="text-gray-600 text-xl">加载中...</div>
      ) : listedToken.isError ? (
        <div className="text-red-600 text-xl">加载失败</div>
      ) : !nftWithMetadata ? (
        <div className="text-gray-600 text-xl">暂无数据</div>
      ) : (
        <div className="bg-white p-8 max-w-4xl w-full">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-shrink-0">
              {nftWithMetadata.metadata?.image ? (
                <div className="relative w-[400px] h-[400px] overflow-hidden">
                  <Image 
                    src={nftWithMetadata.metadata.image} 
                    alt={nftWithMetadata.metadata.name || ''} 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-[400px] h-[400px] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">无图片</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {nftWithMetadata.metadata?.name || 'N/A'}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {nftWithMetadata.metadata?.description || 'N/A'}
                </p>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Price</span>
                  <span className="text-2xl font-bold text-amber-600">
                    {nftWithMetadata.price ? formatEther(nftWithMetadata.price) : 'N/A'} ETH
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Token ID</span>
                  <span className="text-gray-900 font-medium">
                    {nftWithMetadata.tokenId?.toString() || 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Owner</span>
                  <span className="text-gray-900 font-medium">
                    {nftWithMetadata.owner ? `${nftWithMetadata.owner}` : 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm font-medium">Seller</span>
                  <span className="text-gray-900 font-medium">
                    {nftWithMetadata.seller ? `${nftWithMetadata.seller}` : 'N/A'}
                  </span>
                </div>
                {isConnected && address !== nftWithMetadata.owner && address !== nftWithMetadata.seller && (
                <button onClick={handleBuyNow} disabled={isPending} className="w-[460px] mt-[44px] ml-[20px] mr-[20px] bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                  Buy Now
                </button>
                )}
                <div className="text-gray-600 text-xl mt-10">
                  {hash && <div>Transaction Hash: {hash}</div>}
                  {isConfirming && <div>Waiting for confirmation...</div>}
                  {isConfirmed && <div>Transaction confirmed.</div>}
                  {error && (
                    <div className="text-red-500">
                      Error: {(error as BaseError).shortMessage || error.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}