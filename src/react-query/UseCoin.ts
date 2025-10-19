import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function UseCoin({ coin, currency }: { coin: string; currency: string }) {
  return useQuery({
    queryKey: ['coin', coin, currency],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/crypto/coin/${coin}?currency=${currency}`
      );
      return response.data;
    },
  });
}
