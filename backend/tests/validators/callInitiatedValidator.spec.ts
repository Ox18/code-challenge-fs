import {CallInitiatedSchema} from "../../src/socket/schemas/callInitiated.schema";

describe("callInitiatedSchema", () => {
  it("should pass with valid data", () => {
    const result = CallInitiatedSchema.safeParse({
      call_id: "67eda6d16bf03d62960d349c",
      type: "video",
      queue_id: "67eda6d16bf03d62960d349c",
    });

    expect(result.success).toBe(true);
  });

  it("should fail with missing queue_id", () => {
    const result = CallInitiatedSchema.safeParse({
      call_id: "123",
      type: "video",
    });

    expect(result.success).toBe(false);
  });
});
