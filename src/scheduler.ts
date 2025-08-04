import { CronJob } from "cron";
import { runWebAutomation } from "./automation/web-scraper.js";
import { logger } from "./logger.js";

interface SchedulerConfig {
  url: string;
  cronPattern: string;
  timezone?: string;
  headless?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

export class AutomationScheduler {
  private job: CronJob | null = null;
  private config: SchedulerConfig;
  private isRunning: boolean = false;

  constructor(config: SchedulerConfig) {
    this.config = {
      timezone: "America/New_York",
      headless: true,
      retryAttempts: 3,
      retryDelay: 5000, // 5 seconds
      ...config,
    };
  }

  private async executeAutomation(): Promise<void> {
    if (this.isRunning) {
      logger.warn("Automation is already running, skipping this execution");
      return;
    }

    this.isRunning = true;
    let attempt = 1;

    while (attempt <= this.config.retryAttempts!) {
      try {
        logger.info(
          `Starting automation job (attempt ${attempt}/${this.config.retryAttempts})`
        );

        await runWebAutomation(this.config.url, this.config.headless);

        logger.info("Automation job completed successfully");
        break; // Success, exit retry loop
      } catch (error) {
        logger.error(
          `Automation job failed (attempt ${attempt}/${this.config.retryAttempts})`,
          error
        );

        if (attempt < this.config.retryAttempts!) {
          logger.info(
            `Retrying in ${this.config.retryDelay! / 1000} seconds...`
          );
          await this.delay(this.config.retryDelay!);
        } else {
          logger.error("All retry attempts failed. Giving up.");
        }

        attempt++;
      }
    }

    this.isRunning = false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  start(): void {
    if (this.job) {
      logger.warn("Scheduler is already running");
      return;
    }

    logger.info(
      `Starting automation scheduler with pattern: ${this.config.cronPattern}`
    );
    logger.info(`Timezone: ${this.config.timezone}`);
    logger.info(`Target URL: ${this.config.url}`);

    this.job = new CronJob(
      this.config.cronPattern,
      async () => {
        await this.executeAutomation();
      },
      null, // onComplete callback
      false, // start immediately
      this.config.timezone
    );

    // Start the cron job
    this.job.start();

    logger.info("Scheduler started successfully");
    logger.info(`Next execution time: ${this.job.nextDate().toISO()}`);
  }

  stop(): void {
    if (this.job) {
      this.job.stop();
      this.job = null;
      logger.info("Scheduler stopped");
    } else {
      logger.warn("No scheduler is currently running");
    }
  }

  getNextExecutionTime(): string | null {
    if (this.job) {
      return this.job.nextDate().toISO();
    }
    return null;
  }

  isSchedulerRunning(): boolean {
    return this.job !== null && this.job.running;
  }

  // Manual trigger for testing
  async runNow(): Promise<void> {
    logger.info("Manual trigger requested");
    await this.executeAutomation();
  }
}

// Factory function to create a scheduler with common patterns
export function createEvery48HoursScheduler(
  url: string,
  startHour: number = 0,
  startMinute: number = 0,
  timezone: string = "America/New_York"
): AutomationScheduler {
  // Run every 2 days at the specified time
  const cronPattern = `${startMinute} ${startHour} */2 * * *`;

  return new AutomationScheduler({
    url,
    cronPattern,
    timezone,
    headless: true,
  });
}

// Example usage and main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // This will only run if this file is executed directly
  const TARGET_URL = process.env.AUTOMATION_URL || "https://example.com";

  const scheduler = createEvery48HoursScheduler(
    TARGET_URL,
    0, // Hour (0 = midnight)
    0, // Minute
    "America/New_York"
  );

  // Start the scheduler
  scheduler.start();

  // Graceful shutdown handling
  process.on("SIGINT", () => {
    logger.info("Received SIGINT, shutting down gracefully...");
    scheduler.stop();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    logger.info("Received SIGTERM, shutting down gracefully...");
    scheduler.stop();
    process.exit(0);
  });

  // Keep the process alive
  logger.info("Automation scheduler is running. Press Ctrl+C to stop.");
}
