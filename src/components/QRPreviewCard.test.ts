import { getVisibleDetails } from "@/components/QRPreviewCard";
import { describe, expect, it } from "vitest";

const values = {
  firstname: "Sam",
  lastname: "Taylor",
  mobileCountryCode: "+91",
  mobileNumber: "9999999999",
  phoneNumber: "",
  email: "sam@example.com",
  company: "Acme Corp",
};

describe("getVisibleDetails", () => {
  it("returns only name for name mode", () => {
    expect(getVisibleDetails("name", values)).toEqual(["Sam Taylor"]);
  });

  it("returns name and phone for name-phone mode", () => {
    expect(getVisibleDetails("name-phone", values)).toEqual([
      "Sam Taylor",
      "+919999999999",
    ]);
  });

  it("returns name, phone and extra details for full mode", () => {
    expect(getVisibleDetails("full", values)).toEqual([
      "Sam Taylor",
      "+919999999999",
      "sam@example.com",
      "Acme Corp",
    ]);
  });
});
