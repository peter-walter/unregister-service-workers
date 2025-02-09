import { vi, it, expect, describe, beforeAll } from 'vitest';
import unregistersw from '../src/unregistersw';

describe('unregistersw function', () => {
  beforeAll(() => {
    // Mock navigator.serviceWorker using Object.defineProperty
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: {
        getRegistrations: vi.fn(), // Use vi.fn() directly
      },
    });
  });

  it('should unregister all service workers', async () => {
    // Create mock registrations using Partial<ServiceWorkerRegistration>
    const mockUnregister = vi.fn();
    const mockRegistrations: Partial<ServiceWorkerRegistration>[] = [
      { unregister: mockUnregister },
      { unregister: mockUnregister },
    ];

    // Mocking getRegistrations to return the mock registrations
    vi.mocked(navigator.serviceWorker.getRegistrations).mockResolvedValue(mockRegistrations as ServiceWorkerRegistration[]);

    // Call the unregistersw function
    await unregistersw();

    // Verify that unregister was called on each registration
    expect(mockUnregister).toHaveBeenCalledTimes(mockRegistrations.length);
  });

  it('should not throw an error if no service workers are registered', async () => {
    // Mocking getRegistrations to return an empty array
    vi.mocked(navigator.serviceWorker.getRegistrations).mockResolvedValue([]);

    // Call the unregistersw function and assert no errors are thrown
    try {
      await unregistersw();
    } catch (error) {
      // The test should fail if an error is thrown
      expect(error).toBeUndefined();
    }
  });
});
