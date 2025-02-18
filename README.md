# unregistersw

Disables all registered service workers in the current browser session.

## Description

This function checks if the browser supports service workers, retrieves all active
service worker registrations, and attempts to unregister each one.  
If service workers are not supported, a warning is logged to the console.  
Errors during the process are caught and logged.

## Installation

Install the package via npm:

```sh
npm install unregister-service-workers
```

## Returns

`Promise<void>` – A promise that resolves once all service workers have been unregistered.

## Usage

Import and use the function in your JavaScript or TypeScript project:

### JavaScript (CommonJS)

```js
const unregistersw = require("unregister-service-workers").default;

// Call this function to disable all service workers in the current browser session.
unregistersw()
  .then(() => console.log("All service workers have been disabled."))
  .catch((error) => console.error("Failed to disable service workers:", error));
```

### TypeScript / ES Module

```ts
import unregistersw from "unregister-service-workers";

// Call this function to disable all service workers in the current browser session.
unregistersw()
  .then(() => console.log("All service workers have been disabled."))
  .catch((error) => console.error("Failed to disable service workers:", error));
```

## License

This package is released under the MIT License.
