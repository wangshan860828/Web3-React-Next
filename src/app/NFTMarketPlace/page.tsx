'use client'

import { useReadContract, usePublicClient } from "wagmi";
import NFTMarketPlaceJson from "@/contracts/NFTMarketPlace.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEther } from "viem";
import { NFTWithMetadata } from "@/types/nft";

export default function NFTMarketPlacePage() {
  const {address, isConnected} = useAppKitAccount();
  const [nftList, setNftList] = useState<NFTWithMetadata[]>([]);
  const publicClient = usePublicClient();
  const { isPending, isSuccess } = useReadContract();

  const result = useReadContract({
    abi: NFTMarketPlaceJson.abi,
    address: process.env.NEXT_PUBLIC_NFTMARKET_ADDRESS as `0x${string}`,
    functionName: "getAllNFTs",
    query: {
      enabled: isConnected,
    }
  });

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

  useEffect(()=>{
    console.log('useEffect00 isSuccess00 = ', isSuccess)
    // if (!isSuccess) return;

    console.log('useEffect00 isPending11 = ', isPending)
    console.log('useEffect00 data = ', result.data)
    const dataList = result.data as NFTWithMetadata[];
    if (dataList && Array.isArray(dataList) && dataList.length > 0) {
      console.log('dataList@@@@@@@@@:', dataList);
      loadNFTMetadata(dataList);
    } else {
      setNftList([]);
    }
  }, [result.data, address, isSuccess])

  useEffect(()=>{
    console.log('useEffect11 nftList00 = ', nftList)
    // if (!isSuccess) return;
    console.log('useEffect11 nftList11 = ', nftList)
  }, [nftList, isSuccess])

  console.log('NFTMarketPlace page rendering, isConnected:', isConnected, 'isLoading:', result.isLoading, 'nftList length:', nftList.length);

  return (
    <div className="pr-6 pb-6 pt-6">
      {/* <h1 className="text-3xl font-bold mb-6 !mt-0 !mb-6 !ml-0 !mr-0 text-gray-900 relative z-10 bg-red-500 text-white p-4 border-4 border-black">NFT Market Place</h1> */}
      
      {!isConnected ? (
        <p className="text-gray-600">请先连接钱包</p>
      ) : result.isLoading ? (
        <p className="text-gray-600">加载中...</p>
      ) : nftList && nftList.length > 0 ? (
        <div className="nft-box grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" style={{ paddingLeft: '30px', paddingTop: '10px' }}>
          {nftList.map((nft: NFTWithMetadata, index: number) => (
            <Link 
              key={index} 
              href={`/NFTMarketPlace/NFTDetail?tokenId=${nft.tokenId.toString()}`}
              className="block"
            >
              <Card className="card-box overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-200 hover:border-purple-300 cursor-pointer !py-0">
              <div className="relative aspect-[3/2] bg-gray-100" style={{ marginTop: '0' }}>
                {nft.imageError || !nft.metadata?.image ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Image
                      src="/placeholder-nft.svg"
                      alt="Placeholder"
                      fill
                      className="object-cover opacity-50"
                    />
                  </div>
                ) : (
                  <>
                    {!nft.imageLoaded && (
                      <div className="flex items-center justify-center h-full bg-gray-200 animate-pulse">
                        <div className="text-gray-400">Loading...</div>
                      </div>
                    )}
                    <Image
                      src={nft.metadata.image}
                      alt={nft.metadata.name || `NFT #${nft.tokenId}`}
                      fill
                      className={`object-cover ${nft.imageLoaded ? 'block' : 'hidden'}`}
                      onLoad={() => {
                        console.log('Image loaded for token', nft.tokenId);
                        setNftList(prev => prev.map((item, i) => 
                          i === index ? { ...item, imageLoaded: true } : item
                        ));
                      }}
                      onError={(e) => {
                        console.error('Image load error for token', nft.tokenId, e);
                        setNftList(prev => prev.map((item, i) => 
                          i === index ? { ...item, imageError: true } : item
                        ));
                      }}
                    />
                  </>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg ">
                  {nft.metadata?.name || `NFT #${nft.tokenId}`}
                </CardTitle>
                {nft.metadata?.description && (
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {nft.metadata.description}
                  </p>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="font-bold text-lg">
                    {formatEther(nft.price)} ETH
                  </span>
                </div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-gray-500">Seller</span>
                  <span className="text-sm text-gray-700">
                    {nft.seller.substring(0, 6)}...{nft.seller.substring(nft.seller.length - 4)}
                  </span>
                </div>
              </CardContent>
              
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 flex justify-center items-center py-12">
          暂无数据
        </div>
      )}
    </div>
  );
}