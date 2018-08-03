The `mutex` function creates synchronization primitives for values or objects.

Usage
=====
```js
const mutex = require("@zingle/mutex");

function critical(resource) {
    if (let release = mutex(resource)) {
        // ...do critical things...
        release();
    } else {
        throw new Error("could not acquire lock");
    }
}
```
