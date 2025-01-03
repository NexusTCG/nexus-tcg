import { logger, task, wait } from "@trigger.dev/sdk/v3";
import puppeteer, { PuppeteerLifeCycleEvent } from "puppeteer";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export const takeAndUploadScreenshotTask = task({
  id: "take-and-upload-screenshot",
  run: async (
    payload: {
      cardId: string;
      mode?: "initial" | "anomaly";
      isUpdate?: boolean;
    },
  ) => {
    const { cardId, mode, isUpdate } = payload;
    logger.info(
      `Starting screenshot task for ${isUpdate ? "updated" : "new"} card`,
      { cardId },
    );

    // TODO: Update to custom URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ??
      "https://nexus-tcg.vercel.app";

    try {
      // Launch browser and take screenshot
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      // Set viewport size
      await page.setViewport({
        width: 2400,
        height: 2400,
        deviceScaleFactor: 4, // Increased from 2 to match html-to-image quality
      });
      logger.info("Set viewport size to 2400x2400");

      // Navigate to the card page
      logger.info(
        `Navigating to ${siteUrl}/cards/${cardId}?mode=${
          mode === "anomaly" ? "anomaly" : "initial"
        }`,
      );
      await page.goto(
        `${siteUrl}/cards/${cardId}?mode=${
          mode === "anomaly" ? "anomaly" : "initial" // Default to initial mode
        }`,
        {
          waitUntil: [
            "networkidle0",
            "load",
            "domcontentloaded",
          ] as PuppeteerLifeCycleEvent[],
          timeout: 60000,
        },
      );

      // Scroll to bottom and back up
      logger.info("Scrolling to bottom of page to trigger lazy loading.");
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        return new Promise((resolve) => setTimeout(resolve, 100));
      });

      logger.info("Scrolling back up.");
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        return new Promise((resolve) => setTimeout(resolve, 100));
      });

      // Wait for all images to load
      logger.info("Waiting for all images to load.");
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              })
            ),
        );
      });

      // Wait a bit longer to ensure all images are rendered
      await wait.for({ seconds: 2 });

      // Force all images to be visible and loaded
      logger.info("Forcing visibility and loading images.");
      await page.evaluate(() => {
        document.querySelectorAll("img").forEach((img) => {
          img.style.visibility = "visible";
          img.style.display = "inline-block";
          img.loading = "eager";
        });
      });

      // Log page dimensions
      const dimensions = await page.evaluate(() => ({
        devicePixelRatio: window.devicePixelRatio,
        visualViewport: {
          width: window.visualViewport?.width,
          height: window.visualViewport?.height,
        },
        documentElement: {
          clientWidth: document.documentElement.clientWidth,
          clientHeight: document.documentElement.clientHeight,
        },
      }));
      logger.info("Page dimensions:", dimensions);

      // Wait for card element and hide unwanted elements
      logger.info("Waiting for elements to load...");
      await page.evaluate(() => {
        // Hide cookie banner
        const cookieBanner = document.querySelector(
          '[aria-label="Cookie Banner"]',
        );
        if (cookieBanner) {
          (cookieBanner as HTMLElement).style.display = "none";
        }

        // Hide any navigation or header elements
        const header = document.querySelector("header");
        if (header) {
          (header as HTMLElement).style.display = "none";
        }
      });

      try {
        logger.info("Waiting for card element and grade icon to load...");

        // Wait for card container with explicit visibility check
        const cardSelector = `#card-render-container-${cardId}-${
          mode === "anomaly" ? "anomaly" : "initial"
        }`;
        logger.info(`Waiting for card element: ${cardSelector}`);

        await page.waitForSelector(cardSelector, {
          visible: true,
          timeout: 60000,
        });
        if (cardSelector) logger.info("Card container found");

        // Then wait for grade icon with more detailed logging
        const gradeIconSelector = `#grade-icon-${
          mode === "anomaly" ? "anomaly" : "initial" // Default to initial mode
        }`;
        logger.info(`Waiting for grade icon element: ${gradeIconSelector}`);

        await page.waitForSelector(gradeIconSelector, {
          visible: true,
          timeout: 60000,
        });
        if (gradeIconSelector) logger.info("Grade icon element found");

        // Force load the image
        await page.evaluate((selector) => {
          const img = document.querySelector(selector) as HTMLImageElement;
          if (img) {
            img.loading = "eager";
            img.style.visibility = "visible";
            img.style.display = "block";
          }
        }, gradeIconSelector);

        // Wait longer for initial page load
        await wait.for({ seconds: 5 });

        // Check element visibility and dimensions
        const elementInfo = await page.evaluate((selector) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const styles = window.getComputedStyle(el);
          return {
            dimensions: {
              width: rect.width,
              height: rect.height,
              top: rect.top,
              left: rect.left,
            },
            styles: {
              display: styles.display,
              visibility: styles.visibility,
              opacity: styles.opacity,
              position: styles.position,
              zIndex: styles.zIndex,
            },
            isVisible: rect.width > 0 &&
              rect.height > 0 &&
              styles.display !== "none" &&
              styles.visibility !== "hidden",
          };
        }, cardSelector);
        if (elementInfo) logger.info("Card element info:", elementInfo);

        if (!elementInfo?.isVisible) {
          throw new Error("Card element is not visible");
        }

        // Get the element and scroll into view before screenshot
        logger.info("Getting card element and scrolling it into view.");
        const element = await page.$(cardSelector);
        if (element) {
          await element.scrollIntoView();
          await wait.for({ seconds: 1 });
        }

        if (element) {
          logger.info("Card element found");
        } else {
          throw new Error("Card element not found");
        }

        // Get current card data
        const { data: currentCard, error: fetchError } = await supabaseAdmin
          .from("nexus_cards")
          .select("card_render")
          .eq("id", cardId)
          .single();

        if (currentCard) {
          logger.info("Current card data:", currentCard);
        } else if (fetchError) {
          throw new Error("Current card data not found", { cause: fetchError });
        }

        // Take screenshot
        logger.info("Taking screenshot...");
        const screenshot = await element.screenshot({
          type: "png",
          omitBackground: true,
        });

        // Generate filename
        const timestamp = Date.now();
        const filename = `card-${cardId}-${timestamp}.png`;

        // Remove old render if it exists
        if (currentCard?.card_render) {
          logger.info("Removing old render...");
          const oldFilename = currentCard.card_render.split("/").pop();
          if (oldFilename) {
            await supabaseAdmin
              .storage
              .from("card-renders")
              .remove([oldFilename])
              .catch((error) =>
                logger.warn("Failed to remove old render", { error })
              );
          }
        }

        // Upload new screenshot
        logger.info("Uploading new screenshot...");
        const { error: uploadError } = await supabaseAdmin
          .storage
          .from("card-renders")
          .upload(filename, screenshot, {
            contentType: "image/png",
            cacheControl: "no-cache, no-store, must-revalidate",
          });

        if (uploadError) {
          throw new Error("Failed to upload screenshot", {
            cause: uploadError,
          });
        } else {
          logger.info("Screenshot uploaded successfully");
        }

        // Get public URL
        logger.info("Getting public URL...");
        const { data: { publicUrl } } = await supabaseAdmin
          .storage
          .from("card-renders")
          .getPublicUrl(filename);

        // Update card record
        logger.info("Updating card record...");
        const { error: updateError } = await supabaseAdmin
          .from("nexus_cards")
          .update({
            card_render: publicUrl,
          })
          .eq("id", cardId);

        if (updateError) {
          throw new Error("Failed to update card record", {
            cause: updateError,
          });
        } else {
          logger.info("Card record updated successfully");
        }

        // Close browser
        await browser.close();

        logger.info("Screenshot task completed successfully", {
          cardId,
          publicUrl,
        });

        return {
          success: true,
          cardId,
          publicUrl,
          isUpdate,
        };
      } catch (waitError) {
        // Get more context about the page state
        const diagnostics = await Promise.all([
          page.content(),
          page.url(),
          page.title(),
          page.evaluate(() => ({
            viewportSize: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            documentState: document.readyState,
            allImages: Array.from(document.images).map((img) => ({
              id: img.id,
              src: img.src,
              complete: img.complete,
            })),
          })),
        ]).catch((e) => logger.error("Error getting diagnostics:", e));

        logger.error("Element wait failed. Detailed state:", {
          error: waitError,
          url: diagnostics?.[1],
          title: diagnostics?.[2],
          pageState: diagnostics?.[3],
          html: diagnostics?.[0]?.substring(0, 1000),
        });

        throw new Error(
          `Element loading failed: ${(waitError as Error).message}\nPage URL: ${
            diagnostics?.[1]
          }`,
        );
      }
    } catch (error) {
      logger.error("Error in screenshot task", { error });
      throw error;
    }
  },
});
