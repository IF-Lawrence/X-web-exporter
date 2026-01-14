import { Signal } from '@preact/signals-core';
import logger from './logger';
import dayjs from 'dayjs';

/**
 * Date range filter configuration.
 */
export interface DateRangeFilter {
  enabled: boolean;
  startDate: string | null; // ISO 8601 format: YYYY-MM-DD
  endDate: string | null; // ISO 8601 format: YYYY-MM-DD
  stopOnOutOfRange: boolean; // Stop auto-scroll when out-of-range tweet is detected
}

export const DEFAULT_DATE_RANGE_FILTER: DateRangeFilter = {
  enabled: false,
  startDate: null,
  endDate: null,
  stopOnOutOfRange: true,
};

/**
 * Date range filter for tweets.
 */
export class DateRangeFilterManager {
  private config: DateRangeFilter;
  private outOfRangeDetected = false;
  private lastCheckedTimestamp: number | null = null;

  /**
   * Signal for subscribing to state changes.
   */
  public signal = new Signal(0);

  /**
   * Signal fired when out-of-range tweet is detected (for auto-scroll to stop).
   */
  public outOfRangeSignal = new Signal(0);

  constructor(config: DateRangeFilter = DEFAULT_DATE_RANGE_FILTER) {
    this.config = { ...config };
  }

  /**
   * Get current configuration.
   */
  public getConfig(): DateRangeFilter {
    return { ...this.config };
  }

  /**
   * Update configuration.
   */
  public updateConfig(config: Partial<DateRangeFilter>) {
    const oldEnabled = this.config.enabled;
    this.config = { ...this.config, ...config };

    // Reset detection flag when config changes
    if (config.enabled !== undefined && config.enabled !== oldEnabled) {
      this.outOfRangeDetected = false;
    }
    if (config.startDate !== undefined || config.endDate !== undefined) {
      this.outOfRangeDetected = false;
    }

    this.signal.value++;
    logger.debug('Date range filter config updated', this.config);
  }

  /**
   * Check if filter is enabled and properly configured.
   */
  public isActive(): boolean {
    return this.config.enabled && (!!this.config.startDate || !!this.config.endDate);
  }

  /**
   * Check if out-of-range tweet has been detected.
   */
  public hasDetectedOutOfRange(): boolean {
    return this.outOfRangeDetected;
  }

  /**
   * Get the last checked timestamp.
   */
  public getLastCheckedTimestamp(): number | null {
    return this.lastCheckedTimestamp;
  }

  /**
   * Check if a tweet timestamp is within the date range.
   * If out of range is detected, fires the outOfRangeSignal.
   * @param timestamp - UNIX timestamp in milliseconds
   * @returns true if within range or filter is disabled, false otherwise
   */
  public isWithinRange(timestamp: number): boolean {
    this.lastCheckedTimestamp = timestamp;

    if (!this.isActive()) {
      return true; // Filter disabled, accept all
    }

    const tweetDate = dayjs(timestamp);
    let withinRange = true;

    // Check start date
    if (this.config.startDate) {
      const startDate = dayjs(this.config.startDate).startOf('day');
      if (tweetDate.isBefore(startDate)) {
        withinRange = false;
        if (this.config.stopOnOutOfRange && !this.outOfRangeDetected) {
          this.outOfRangeDetected = true;
          this.outOfRangeSignal.value++;
          logger.info(
            `Date filter: Tweet ${tweetDate.format('YYYY-MM-DD')} is before start date ${this.config.startDate}, out-of-range signal fired`,
          );
        }
      }
    }

    // Check end date
    if (this.config.endDate) {
      const endDate = dayjs(this.config.endDate).endOf('day');
      if (tweetDate.isAfter(endDate)) {
        withinRange = false;
        if (this.config.stopOnOutOfRange && !this.outOfRangeDetected) {
          this.outOfRangeDetected = true;
          this.outOfRangeSignal.value++;
          logger.info(
            `Date filter: Tweet ${tweetDate.format('YYYY-MM-DD')} is after end date ${this.config.endDate}, out-of-range signal fired`,
          );
        }
      }
    }

    return withinRange;
  }

  /**
   * Check if a tweet timestamp is before the start date (older than range).
   * This is useful for stopping auto-scroll when reaching older tweets.
   * @param timestamp - UNIX timestamp in milliseconds
   * @returns true if tweet is older than start date
   */
  public isBeforeRange(timestamp: number): boolean {
    if (!this.isActive() || !this.config.startDate) {
      return false;
    }

    const tweetDate = dayjs(timestamp);
    const startDate = dayjs(this.config.startDate).startOf('day');
    return tweetDate.isBefore(startDate);
  }

  /**
   * Check if a tweet timestamp is after the end date (newer than range).
   * @param timestamp - UNIX timestamp in milliseconds
   * @returns true if tweet is newer than end date
   */
  public isAfterRange(timestamp: number): boolean {
    if (!this.isActive() || !this.config.endDate) {
      return false;
    }

    const tweetDate = dayjs(timestamp);
    const endDate = dayjs(this.config.endDate).endOf('day');
    return tweetDate.isAfter(endDate);
  }

  /**
   * Get human-readable description of the date range.
   */
  public getDescription(): string {
    if (!this.isActive()) {
      return 'No date filter';
    }

    if (this.config.startDate && this.config.endDate) {
      return `${this.config.startDate} to ${this.config.endDate}`;
    } else if (this.config.startDate) {
      return `From ${this.config.startDate}`;
    } else if (this.config.endDate) {
      return `Until ${this.config.endDate}`;
    }

    return 'Invalid date range';
  }

  /**
   * Reset filter to default state.
   */
  public reset() {
    this.config = { ...DEFAULT_DATE_RANGE_FILTER };
    this.outOfRangeDetected = false;
    this.lastCheckedTimestamp = null;
    this.signal.value++;
    logger.debug('Date range filter reset');
  }

  /**
   * Reset the out-of-range detection flag.
   * Call this when starting a new scrolling session.
   */
  public resetDetection() {
    this.outOfRangeDetected = false;
    this.lastCheckedTimestamp = null;
    logger.debug('Date range filter detection reset');
  }
}

// Global instance
export const dateRangeFilter = new DateRangeFilterManager();
