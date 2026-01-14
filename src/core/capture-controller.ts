import { Signal } from '@preact/signals-core';
import logger from '@/utils/logger';
import { autoScroller } from '@/utils/auto-scroller';
import { dateRangeFilter } from '@/utils/date-filter';

/**
 * Global capture controller for managing the capture state.
 * 
 * This controller decouples "module selection" from "capturing":
 * - Module `enabled` = "Which modules to capture when capturing starts"
 * - `isCapturing` = "Is the capture process currently active"
 * 
 * Only when `enabled && isCapturing` will the interceptors actually process data.
 */
export class CaptureController {
    private _isCapturing = false;

    /**
     * Signal for subscribing to capture state changes.
     */
    public signal = new Signal(0);

    /**
     * Check if capture is currently active.
     */
    public get isCapturing(): boolean {
        return this._isCapturing;
    }

    constructor() {
        // Subscribe to dateRangeFilter out-of-range signal
        dateRangeFilter.outOfRangeSignal.subscribe(() => {
            if (this._isCapturing && dateRangeFilter.hasDetectedOutOfRange()) {
                logger.info('Capture stopped due to date range filter (out of range detected)');
                this.stop();
            }
        });
    }

    /**
     * Initialize auto-start capture based on options.
     * This should be called after options are loaded.
     */
    public initAutoStart(autoStart: boolean): void {
        if (autoStart && !this._isCapturing) {
            logger.info('Auto-start capture enabled, starting capture...');
            this.start();
        }
    }

    /**
     * Start the capture process.
     * - Sets isCapturing to true
     * - Starts autoScroller if enabled
     * - Resets dateRangeFilter detection
     */
    public start(): void {
        if (this._isCapturing) {
            logger.warn('Capture is already running');
            return;
        }

        this._isCapturing = true;
        logger.info('Capture started');

        // Reset date filter detection for fresh start
        dateRangeFilter.resetDetection();

        // Start auto-scroller if it's enabled
        if (autoScroller.getConfig().enabled && !autoScroller.isRunning()) {
            autoScroller.start();
        }

        this.signal.value++;
    }

    /**
     * Stop the capture process.
     * - Sets isCapturing to false
     * - Stops autoScroller if running
     */
    public stop(): void {
        if (!this._isCapturing) {
            return;
        }

        this._isCapturing = false;
        logger.info('Capture stopped');

        // Stop auto-scroller if running
        if (autoScroller.isRunning()) {
            autoScroller.stop();
        }

        this.signal.value++;
    }

    /**
     * Toggle the capture state.
     */
    public toggle(): void {
        if (this._isCapturing) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// Global instance
export const captureController = new CaptureController();
