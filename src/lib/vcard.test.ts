import { generateVCardString } from "@/lib/vcard";
import { describe, expect, it } from "vitest";

describe("generateVCardString", () => {
  it("returns empty string when nothing useful is provided", () => {
    const result = generateVCardString({ firstname: "" });
    expect(result).toBe("");
  });

  it("builds a vCard with minimum required fields", () => {
    const result = generateVCardString({
      firstname: "John",
      lastname: "Doe",
      mobileCountryCode: "+1",
      mobileNumber: "1234567890",
    });

    expect(result).toContain("BEGIN:VCARD");
    expect(result).toContain("FN:John Doe");
    expect(result).toContain("+11234567890");
    expect(result).toContain("END:VCARD");
  });

  it("normalizes website and includes optional fields", () => {
    const result = generateVCardString({
      firstname: "Jane",
      mobileCountryCode: "+44",
      mobileNumber: "777777777",
      email: "jane@example.com",
      website: "example.com",
      company: "Acme",
    });

    expect(result).toContain("EMAIL");
    expect(result).toContain("jane@example.com");
    expect(result).toContain("https://example.com");
    expect(result).toContain("Acme");
  });
});
