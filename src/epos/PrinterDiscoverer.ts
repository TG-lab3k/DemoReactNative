export interface DiscoveredPrinterInfo {
  model: string;
  seriesId: number;
  address: string;
}

export type PrinterDiscovererListener = (
  discoveredPrinterInfo: DiscoveredPrinterInfo,
) => Promise<void>;

export interface PrinterDiscoverer {
  addDiscoverListener(listener: PrinterDiscovererListener): Promise<void>;
  removeDiscoverListener(listener: PrinterDiscovererListener): Promise<void>;
  discover(): Promise<void>;
  dispose(): Promise<void>;
  getPrinter(): Promise<DiscoveredPrinterInfo | undefined>;
}
