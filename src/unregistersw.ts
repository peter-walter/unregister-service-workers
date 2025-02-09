/**
 * Unregisters all active service workers.
 * 
 * This function uses the `navigator.serviceWorker.getRegistrations()` method
 * to retrieve all active service worker registrations. It then iterates over
 * each registration and calls the `unregister()` method on each of them.
 * 
 * Note: This operation is asynchronous, and service workers will be unregistered
 * only after the promise returned by `getRegistrations()` resolves. The function
 * does not return any value and does not provide feedback if the unregister operation
 * is successful or if no service workers are currently registered.
 * 
 * @returns {void} This function does not return any value.
 * 
 * @example
 * // Example usage:
 * unregistersw(); // Unregisters all active service workers.
 */
export default function unregistersw(): void {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
            registration.unregister();
        } 
    });
}
