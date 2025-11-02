import { NFTCollection } from "@/Interfaces/crypto/NFTs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseNFTProps {
  nft: string;
  options?: {
    enabled?: boolean;
  };
}

export function UseNFT({ nft, options }: UseNFTProps) {
  return useQuery<NFTCollection>({
    queryKey: ["nfts-list", nft],
    queryFn: async () => {
      const { data } = await axios.get(`/api/crypto/nfts-list/${nft}`);
      return data;
    },
    enabled: !!nft && (options?.enabled ?? true)
  });
}
