class CircuitBreaker {
    constructor(failureThreshold, resetTimeout) {
        this.failureThreshold = failureThreshold; // Number of failures before opening the circuit
        this.resetTimeout = resetTimeout; // Time to wait before closing the circuit again
        this.failureCount = 0;
        this.lastFailureTime = 0;
        this.state = 'CLOSED';
    }

    async call(action) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.state = 'CLOSED';
                this.failureCount = 0;
            } else {
                throw new Error("Circuit is open, request blocked");
            }
        }

        try {
            const result = await action();
            this.failureCount = 0;
            return result;
        } catch (error) {
            this.failureCount++;
            this.lastFailureTime = Date.now();
            if (this.failureCount >= this.failureThreshold) {
                this.state = 'OPEN';
            }
            throw error;
        }
    }
}

module.exports = CircuitBreaker;
