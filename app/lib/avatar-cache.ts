interface CacheEntry {
  buffer: Buffer;
  timestamp: number;
  hits: number;
}

class AvatarCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private maxAge: number; // in milliseconds

  constructor(maxSize = 200, maxAgeHours = 24) {
    this.maxSize = maxSize;
    this.maxAge = maxAgeHours * 60 * 60 * 1000; // Convert hours to ms
  }

  private generateKey(address: string, size: number): string {
    return `${address.toLowerCase()}_${size}`;
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    
    // Remove expired entries
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    }

    // If still over limit, remove least recently used (oldest timestamp + least hits)
    if (this.cache.size > this.maxSize) {
      const sortedEntries = Array.from(this.cache.entries()).sort((a, b) => {
        // Sort by hits (ascending) then by timestamp (ascending)
        if (a[1].hits !== b[1].hits) {
          return a[1].hits - b[1].hits;
        }
        return a[1].timestamp - b[1].timestamp;
      });

      const toRemove = sortedEntries.slice(0, this.cache.size - this.maxSize + 1);
      for (const [key] of toRemove) {
        this.cache.delete(key);
      }
    }
  }

  get(address: string, size: number): Buffer | null {
    const key = this.generateKey(address, size);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    // Update hit count and timestamp for LRU
    entry.hits++;
    entry.timestamp = now;
    
    return entry.buffer;
  }

  set(address: string, size: number, buffer: Buffer): void {
    const key = this.generateKey(address, size);
    
    this.cache.set(key, {
      buffer,
      timestamp: Date.now(),
      hits: 0
    });

    // Cleanup old entries if needed
    if (this.cache.size > this.maxSize) {
      this.cleanup();
    }
  }

  getStats(): { size: number; maxSize: number; hitRate?: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize
    };
  }

  clear(): void {
    this.cache.clear();
  }
}

// Global cache instance
export const avatarCache = new AvatarCache();