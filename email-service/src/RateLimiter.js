class RateLimiter {
    constructor(limit, interval) {
        this.limit = limit; // Number of allowed requests
        this.interval = interval; // Time window in milliseconds
        this.requests = [];
    }

    canSend() {
        const now = Date.now();
        // Remove timestamps outside of the current interval
        this.requests = this.requests.filter(timestamp => now - timestamp < this.interval);

        if (this.requests.length < this.limit) {
            this.requests.push(now);
            return true;
        }
        return false;
    }
}

module.exports = RateLimiter;
