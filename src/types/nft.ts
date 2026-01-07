export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

export interface NFTWithMetadata {
  tokenId: bigint;
  owner: string;
  seller: string;
  price: bigint;
  currentlyListed: boolean;
  metadata?: NFTMetadata;
  imageLoaded?: boolean;
  imageError?: boolean;
}
