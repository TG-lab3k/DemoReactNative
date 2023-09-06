import {
  PrinterDiscoverer,
  DiscoveredPrinterInfo,
  PrinterDiscovererListener,
} from './PrinterDiscoverer';
import {
  IPrinter,
  PrinterSeriesName,
} from 'react-native-esc-pos-printer/lib/typescript/types';
import {PRINTER_SERIES} from 'react-native-esc-pos-printer';

export class EpsonPrinterDiscoverer implements PrinterDiscoverer {
  private static RectEscPosPrinter = require('react-native-esc-pos-printer')
    .default;

  private listenerSet: Set<PrinterDiscovererListener> =
    new Set<PrinterDiscovererListener>();

  private discovering = false;

  private foundPrinterInfo?: DiscoveredPrinterInfo;

  async addDiscoverListener(
    listener: PrinterDiscovererListener,
  ): Promise<void> {
    if (!this.listenerSet.has(listener)) {
      this.listenerSet.add(listener);
    }
  }

  async removeDiscoverListener(
    listener: PrinterDiscovererListener,
  ): Promise<void> {
    this.listenerSet.delete(listener);
  }

  async discover(): Promise<void> {
    if (this.discovering) {
      return;
    }

    this.discovering = true;
    try {
      const printers: IPrinter[] =
        await EpsonPrinterDiscoverer.RectEscPosPrinter.discover({
          usbSerialNumber: true,
          scanningTimeoutAndroid: 5000,
          findFirstAndroid: false,
        });
      this.notifyPrinterFound(printers);
    } finally {
      this.discovering = false;
    }
  }

  private async notifyPrinterFound(printers: IPrinter[]) {
    if (!printers || printers.length == 0) {
      return;
    }

    const usbPrinters: IPrinter[] = printers.filter(printer =>
      String(printer.target).startsWith('USB:'),
    );
    const targetPrinter =
      usbPrinters && usbPrinters.length > 0 ? usbPrinters[0] : null;
    if (targetPrinter) {
      const printerSeriesName = targetPrinter.name as PrinterSeriesName;
      const printerSeriesId =
        PRINTER_SERIES[printerSeriesName] || PRINTER_SERIES.EPOS2_TM_U220;
      const targetPrinterInfo: DiscoveredPrinterInfo = {
        model: printerSeriesName,
        seriesId: printerSeriesId,
        address: targetPrinter.usb,
      };

      console.log(`#notifyPrinterFound# model: ${targetPrinterInfo.model}, 
            seriesId: ${targetPrinterInfo.seriesId}, 
            address: ${targetPrinterInfo.address}`);

      this.foundPrinterInfo = targetPrinterInfo;
      this.listenerSet.forEach(listener => {
        listener.caller.call(targetPrinterInfo);
      });
    }
  }

  async dispose(): Promise<void> {
    this.listenerSet.clear();
    if (this.discovering) {
      try {
        await EpsonPrinterDiscoverer.RectEscPosPrinter.discover({
          usbSerialNumber: true,
          scanningTimeoutAndroid: 10,
          findFirstAndroid: true,
        });
      } finally {
        this.discovering = false;
      }
    }
  }

  async getPrinter(): Promise<DiscoveredPrinterInfo | undefined> {
    return Promise.resolve(this.foundPrinterInfo);
  }
}
