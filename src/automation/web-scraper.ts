import puppeteer, { Browser, Page } from "puppeteer";
import { logger } from "../logger.js";

interface AutomationConfig {
  url: string;
  headless?: boolean;
  timeout?: number;
}

export class WebAutomation {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: AutomationConfig;

  constructor(config: AutomationConfig) {
    this.config = {
      headless: true,
      timeout: 30000,
      ...config,
    };
  }

  async initialize(): Promise<void> {
    try {
      logger.info("Launching browser...");

      this.browser = await puppeteer.launch({
        headless: this.config.headless,
        defaultViewport: { width: 1280, height: 720 },
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      });

      this.page = await this.browser.newPage();

      // Set a reasonable timeout for navigation and element waiting
      this.page.setDefaultTimeout(this.config.timeout!);

      logger.info("Browser initialized successfully");
    } catch (error) {
      logger.error("Failed to initialize browser", error);
      throw error;
    }
  }

  async navigateToSite(): Promise<void> {
    if (!this.page) {
      throw new Error("Browser not initialized. Call initialize() first.");
    }

    try {
      logger.info(`Navigating to ${this.config.url}...`);

      await this.page.goto(this.config.url, {
        waitUntil: "networkidle2",
        timeout: this.config.timeout,
      });

      logger.info("Successfully navigated to site");
    } catch (error) {
      logger.error("Failed to navigate to site", error);
      throw error;
    }
  }

  async clickButton(selector: string, description?: string): Promise<void> {
    if (!this.page) {
      throw new Error("Browser not initialized. Call initialize() first.");
    }

    try {
      const buttonDescription = description || selector;
      logger.info(`Waiting for button: ${buttonDescription}`);

      // Wait for the element to be present and visible
      await this.page.waitForSelector(selector, { visible: true });

      // Scroll the element into view if needed
      await this.page.evaluate((sel) => {
        const element = document.querySelector(sel);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, selector);

      // Wait a bit for any animations to complete
      await this.page.waitForTimeout(1000);

      // Click the button
      await this.page.click(selector);

      logger.info(`Successfully clicked: ${buttonDescription}`);

      // Wait for any potential navigation or loading
      await this.page.waitForTimeout(2000);
    } catch (error) {
      logger.error(`Failed to click button ${selector}`, error);
      throw error;
    }
  }

  async waitForElement(selector: string, timeout?: number): Promise<void> {
    if (!this.page) {
      throw new Error("Browser not initialized. Call initialize() first.");
    }

    try {
      logger.debug(`Waiting for element: ${selector}`);
      await this.page.waitForSelector(selector, {
        visible: true,
        timeout: timeout || this.config.timeout,
      });
      logger.debug(`Element found: ${selector}`);
    } catch (error) {
      logger.error(`Element not found: ${selector}`, error);
      throw error;
    }
  }

  async takeScreenshot(filename?: string): Promise<void> {
    if (!this.page) {
      throw new Error("Browser not initialized. Call initialize() first.");
    }

    try {
      const screenshotName = filename || `screenshot-${Date.now()}.png`;
      await this.page.screenshot({
        path: `screenshots/${screenshotName}`,
        fullPage: true,
      });
      logger.info(`Screenshot saved: ${screenshotName}`);
    } catch (error) {
      logger.error("Failed to take screenshot", error);
    }
  }

  async cleanup(): Promise<void> {
    try {
      if (this.page) {
        await this.page.close();
        this.page = null;
      }

      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }

      logger.info("Browser cleanup completed");
    } catch (error) {
      logger.error("Error during cleanup", error);
    }
  }

  async runAutomation(): Promise<void> {
    try {
      await this.initialize();
      await this.navigateToSite();

      // TODO: Replace these with your actual button selectors and logic
      // Example button clicking sequence:

      // await this.clickButton('#first-button', 'First Button');
      // await this.waitForElement('#second-button');
      // await this.clickButton('#second-button', 'Second Button');
      // await this.takeScreenshot('automation-complete.png');

      logger.info("Automation completed successfully");
    } catch (error) {
      logger.error("Automation failed", error);

      // Take a screenshot on error for debugging
      try {
        await this.takeScreenshot(`error-${Date.now()}.png`);
      } catch (screenshotError) {
        logger.error("Failed to take error screenshot", screenshotError);
      }

      throw error;
    } finally {
      await this.cleanup();
    }
  }
}

// Example usage function
export async function runWebAutomation(
  url: string,
  headless: boolean = true
): Promise<void> {
  const automation = new WebAutomation({
    url,
    headless,
    timeout: 30000,
  });

  await automation.runAutomation();
}
