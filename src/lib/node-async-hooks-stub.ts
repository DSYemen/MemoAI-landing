// WARNING: This is a STUB and does NOT replicate full AsyncLocalStorage functionality.
// It's an attempt to prevent the "is not a constructor" error.
// Genkit might still behave unexpectedly if it relies on actual context propagation.

export class AsyncLocalStorage<T = any> {
  private _store: T | undefined;

  constructor() {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(
        'AsyncLocalStorage STUB: Full functionality is NOT available in the browser. ' +
        'Genkit features relying on deep context propagation may not work as expected.'
      );
    }
    this._store = undefined;
  }

  getStore(): T | undefined {
    return this._store;
  }

  enterWith(store: T): void {
    // In a real ALS, this would set the context for the current async chain.
    // Here, we can only simulate it for the synchronous part of the call.
    this._store = store;
  }

  run<R, TArgs extends any[]>(store: T, callback: (...args: TArgs) => R, ...args: TArgs): R {
    const oldStore = this._store;
    this._store = store;
    try {
      return callback(...args);
    } finally {
      this._store = oldStore;
    }
  }

  exit<R, TArgs extends any[]>(callback: (...args: TArgs) => R, ...args: TArgs): R {
     // This is more complex to stub correctly without the async chain.
     // For simplicity, just run the callback. The store won't be "exited" from in an async sense.
    const oldStore = this._store;
    // Typically, exit is called to restore the context that was active *before* the `run` or `enterWith`
    // that established the current store. In a simple stub, we might just clear it or restore a previous known value.
    // For this stub, let's assume it clears or implies the callback runs outside this specific store.
    // A more robust stub might require a stack of stores.
    try {
      return callback(...args);
    } finally {
      // This part is tricky. `exit` is about restoring the *outer* context.
      // Without a stack, simply setting to undefined or oldStore might be incorrect
      // depending on how Genkit uses it.
      // Let's revert to oldStore, similar to `run`.
      this._store = oldStore;
    }
  }

  disable(): void {
    // No-op in this stub
  }
}

// If Genkit requires other exports from 'node:async_hooks', they would need to be stubbed here too.
// For example:
// export class AsyncResource { constructor(type: string, triggerAsyncId?: any) { /* ... */ } }
// For now, only AsyncLocalStorage as it's in the error.
