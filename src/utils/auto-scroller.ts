import { Signal } from '@preact/signals-core';
import logger from './logger';
import { dateRangeFilter } from './date-filter';

/**
 * Auto-scroller configuration.
 */
export interface AutoScrollerConfig {
  enabled: boolean;
  interval: number; // Base scroll interval in milliseconds
  distance: number; // Base scroll distance in pixels
  maxScrollAttempts: number; // Stop after N attempts with no new content
  randomness: number; // Randomness factor (0-1), 0 = no randomness, 1 = max randomness
  pauseProbability: number; // Probability of random pause (0-1)
  pauseDuration: number; // Base duration of random pause in milliseconds
}

export const DEFAULT_AUTO_SCROLLER_CONFIG: AutoScrollerConfig = {
  enabled: false,
  interval: 2500, // 2.5 seconds base interval
  distance: 800, // ~one viewport height
  maxScrollAttempts: 5,
  randomness: 0.4, // 40% randomness - makes behavior less predictable
  pauseProbability: 0.15, // 15% chance of pause - simulates reading
  pauseDuration: 3000, // 3 seconds base pause duration
};

/**
 * Auto-scroller for Twitter web pages with human-like behavior.
 */
export class AutoScroller {
  private config: AutoScrollerConfig;
  private timerId: number | null = null;
  private lastScrollHeight = 0;
  private noChangeCount = 0;
  private scrollCount = 0; // Track total scrolls for varying behavior

  /**
   * Signal for subscribing to state changes.
   */
  public signal = new Signal(0);

  constructor(config: AutoScrollerConfig = DEFAULT_AUTO_SCROLLER_CONFIG) {
    this.config = { ...config };
  }

  /**
   * Generate a random number within a range based on base value and randomness factor.
   */
  private randomize(baseValue: number, randomnessFactor: number): number {
    const variance = baseValue * randomnessFactor;
    const min = baseValue - variance;
    const max = baseValue + variance;
    return Math.random() * (max - min) + min;
  }

  /**
   * Decide if should pause based on probability.
   */
  private shouldPause(): boolean {
    return Math.random() < this.config.pauseProbability;
  }

  /**
   * Get current configuration.
   */
  public getConfig(): AutoScrollerConfig {
    return { ...this.config };
  }

  /**
   * Update configuration.
   * Note: Auto-scroll is only started/stopped by captureController, not by config changes.
   */
  public updateConfig(config: Partial<AutoScrollerConfig>) {
    this.config = { ...this.config, ...config };
    this.signal.value++;
    logger.debug('Auto-scroller config updated', this.config);

    // Only stop if explicitly disabled while running
    if (!this.config.enabled && this.isRunning()) {
      this.stop();
    }
    // Note: We do NOT auto-start here. Starting is controlled by captureController.
  }

  /**
   * Check if auto-scrolling is currently running.
   */
  public isRunning(): boolean {
    return this.timerId !== null;
  }

  /**
   * Start auto-scrolling with human-like behavior.
   */
  public start() {
    if (this.isRunning()) {
      logger.warn('Auto-scroller is already running');
      return;
    }

    logger.info('Auto-scroller started with human-like behavior', this.config);
    this.lastScrollHeight = document.documentElement.scrollHeight;
    this.noChangeCount = 0;
    this.scrollCount = 0;
    this.config.enabled = true;

    // Reset date filter detection when starting
    dateRangeFilter.resetDetection();

    // Subscribe to date filter out-of-range signal
    const unsubscribe = dateRangeFilter.outOfRangeSignal.subscribe(() => {
      if (dateRangeFilter.hasDetectedOutOfRange()) {
        logger.info('Auto-scroller stopped due to date range filter');
        this.stop();
      }
    });

    // Store unsubscribe function for cleanup
    (this as any)._dateFilterUnsubscribe = unsubscribe;

    // Schedule first scroll
    this.scheduleNextScroll();

    this.signal.value++;
  }

  /**
   * Stop auto-scrolling.
   * Note: This does NOT change config.enabled. The enabled state is controlled by the UI.
   */
  public stop() {
    if (!this.isRunning()) {
      return;
    }

    logger.info(`Auto-scroller stopped after ${this.scrollCount} scrolls`);
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    // Cleanup date filter subscription
    if ((this as any)._dateFilterUnsubscribe) {
      (this as any)._dateFilterUnsubscribe();
      (this as any)._dateFilterUnsubscribe = null;
    }

    // Note: We do NOT set config.enabled = false here.
    // The enabled state is controlled by the UI, not by stop().
    this.signal.value++;
  }

  /**
   * Schedule the next scroll with randomized timing.
   */
  private scheduleNextScroll() {
    if (!this.config.enabled) {
      return;
    }

    // Decide if should take a longer pause (simulating reading)
    let nextInterval: number;
    if (this.shouldPause()) {
      nextInterval = this.randomize(this.config.pauseDuration, this.config.randomness);
      logger.debug(`Taking a reading pause: ${Math.round(nextInterval)}ms`);
    } else {
      nextInterval = this.randomize(this.config.interval, this.config.randomness);
    }

    this.timerId = window.setTimeout(() => {
      this.scroll();
      this.scheduleNextScroll(); // Schedule next scroll after this one
    }, nextInterval);
  }

  /**
   * Perform a single scroll action with human-like behavior.
   */
  private scroll() {
    const currentScrollHeight = document.documentElement.scrollHeight;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Check if we've reached the bottom
    const isAtBottom =
      currentScrollTop + window.innerHeight >= document.documentElement.scrollHeight - 100;

    if (isAtBottom) {
      // Check if page height has changed
      if (currentScrollHeight === this.lastScrollHeight) {
        this.noChangeCount++;
        logger.debug(
          `No new content loaded (${this.noChangeCount}/${this.config.maxScrollAttempts})`,
        );

        // Stop if no new content after several attempts
        if (this.noChangeCount >= this.config.maxScrollAttempts) {
          logger.info('Reached end of content, stopping auto-scroller');
          this.stop();
          return;
        }
      } else {
        // New content loaded, reset counter
        this.noChangeCount = 0;
        this.lastScrollHeight = currentScrollHeight;
      }
    }

    // Randomize scroll distance to simulate human behavior
    const scrollDistance = this.randomize(this.config.distance, this.config.randomness);

    // Occasionally do smaller scrolls (simulate micro-adjustments)
    const isMicroScroll = Math.random() < 0.1; // 10% chance
    const finalDistance = isMicroScroll ? scrollDistance * 0.3 : scrollDistance;

    // Use smooth scrolling to mimic human behavior
    window.scrollBy({
      top: finalDistance,
      behavior: 'smooth',
    });

    this.scrollCount++;
    logger.debug(
      `Scroll #${this.scrollCount}: ${Math.round(finalDistance)}px${isMicroScroll ? ' (micro)' : ''} (height: ${currentScrollHeight}px)`,
    );
  }

  /**
   * Reset the scroller state.
   */
  public reset() {
    this.lastScrollHeight = document.documentElement.scrollHeight;
    this.noChangeCount = 0;
    this.scrollCount = 0;
    logger.debug('Auto-scroller state reset');
  }
}

// Global instance
export const autoScroller = new AutoScroller();
