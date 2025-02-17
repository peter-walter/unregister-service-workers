/**
 * Disables all registered service workers in the current browser session.
 *
 * This function checks if the browser supports service workers, retrieves all active
 * service worker registrations, and attempts to unregister each one. If service workers
 * are not supported, a warning is logged to the console. Errors during the process are caught
 * and logged.
 *
 * @returns {Promise<void>} A promise that resolves once all service workers have been unregistered.
 *
 * @example
 * // Call this function to disable all service workers in the current browser session.
 * disableServiceWorkers()
 *   .then(() => console.log("All service workers have been disabled."))
 *   .catch(error => console.error("Failed to disable service workers:", error));
 */
export async function unregistersw(): Promise<void> {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service workers are not supported in this browser.");
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  } catch (error) {
    console.error("Error unregistering service workers:", error);
  }
}
