const mutexes = new Map();

/**
 * Acquire mutex for an object or value.
 * @param {*} resource
 * @param {number} [timeout]
 * @returns {Mutex|false}
 */
function mutex(resource, timeout=Infinity) {
    if (mutexes.has(resource)) return false;

    const mutex = {};

    if (timeout < Infinity) {
        mutex.timeout = setTimeout(() => {
            try {release();} catch (err) {}
        });
    }

    mutexes.set(resource, mutex);
    return release;

    function release() {
        if (mutexes.get(resource) === mutex) {
            mutexes.delete(resource);
            clearTimeout(mutex.timeout);
        } else {
            throw new Error("mutex already released");
        }
    }
}

module.exports = mutex;
