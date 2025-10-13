import { create } from 'zustand';

interface ChartState {
  chartcoin: string[];
  setChartcoin: (value: string[]) => void;
  coin: string[];
  setCoin: (coin: string[]) => void;
  showMarketCap: boolean;
  setShowMarketCap: (v: boolean) => void;
  showVolume: boolean;
  setShowVolume: (v: boolean) => void;
}

export const useSearchChartStore = create<ChartState>((set) => ({
  chartcoin:['bitcoin'],
  setChartcoin: (value) => set({ chartcoin: value }),
  coin: ['bitcoin'],
  setCoin: (coin) => set({ coin }),
  showMarketCap: false,
  setShowMarketCap: (v) => set({ showMarketCap: v }),
  showVolume: false,
  setShowVolume: (v) => set({ showVolume: v }),
}));
