import { expect, test } from "@playwright/test";

test("home page renders and navigates to generator", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Create a vCard QR in Seconds" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Open Generator" }).click();

  await expect(
    page.getByRole("heading", { name: "Build Your Shareable QR" }),
  ).toBeVisible();
});

test("generator enables live preview with minimum data", async ({ page }) => {
  await page.goto("/app");

  const downloadButton = page.getByRole("button", { name: /download/i });
  await expect(downloadButton).toBeDisabled();

  await page.getByPlaceholder("First name").fill("Ava");
  await page.getByPlaceholder("Mobile").fill("9876543210");

  await expect(
    page.getByText("Fill first name and one phone number"),
  ).toBeHidden();
  await expect(downloadButton).toBeEnabled();
});

test("can switch QR theme and visible info mode", async ({ page }) => {
  await page.goto("/app");

  await page.getByPlaceholder("First name").fill("Ava");
  await page.getByPlaceholder("Mobile").fill("9876543210");
  await page.getByPlaceholder("name@company.com").fill("ava@acme.dev");

  await expect(page.getByText("Theme")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Download Clean Light" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next QR theme" }).click();
  await expect(
    page.getByRole("button", { name: "Download Midnight" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "More Info" }).click();
  await expect(page.getByText("ava@acme.dev")).toBeVisible();
});

test("downloads QR with selected theme filename", async ({ page }) => {
  await page.goto("/app");

  await page.getByPlaceholder("First name").fill("Ava");
  await page.getByPlaceholder("Mobile").fill("9876543210");

  await page.getByRole("button", { name: "Next QR theme" }).click();
  await expect(
    page.getByRole("button", { name: "Download Midnight" }),
  ).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download Midnight" }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("midnight-vcard-qr.png");
});
