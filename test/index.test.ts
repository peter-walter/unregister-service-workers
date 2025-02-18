import { describe, it, vi, expect, beforeEach } from "vitest";
import unregistersw from "../src";

// Mock the service worker API
beforeEach(() => {
  vi.restoreAllMocks(); // Reset mocks before each test
});

describe("unregistersw", () => {
  it("should warn if service workers are not supported", async () => {
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    Object.defineProperty(global, "navigator", {
      value: {},
      configurable: true,
    });

    await unregistersw();

    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock).toHaveBeenCalledWith(
      "Service workers are not supported in this browser.",
    );

    consoleWarnMock.mockRestore();
  });

  it("should unregister all service workers", async () => {
    const mockUnregister = vi.fn(() => Promise.resolve(true));
    const mockRegistrations = [
      { unregister: mockUnregister },
      { unregister: mockUnregister },
    ];

    Object.defineProperty(global, "navigator", {
      value: {
        serviceWorker: {
          getRegistrations: vi.fn(() => Promise.resolve(mockRegistrations)),
        },
      },
      configurable: true,
    });

    await unregistersw();

    expect(mockUnregister).toHaveBeenCalledTimes(mockRegistrations.length);
  });

  it("should log an error if an exception occurs", async () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    Object.defineProperty(global, "navigator", {
      value: {
        serviceWorker: {
          getRegistrations: vi.fn(() =>
            Promise.reject(new Error("Test error")),
          ),
        },
      },
      configurable: true,
    });

    await unregistersw();

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error unregistering service workers:",
      expect.any(Error),
    );

    consoleErrorMock.mockRestore();
  });
});
