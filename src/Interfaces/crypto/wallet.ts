import { ICoin } from "./coin";

export interface WalletCoin extends Pick<ICoin, "id" | "symbol" | "name"> {
  amount?: number;
  image:
    | string
    | {
        small?: string;
      };
}
