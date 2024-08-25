const RateLimiter = require('./RateLimiter');
const CircuitBreaker = require('./CircuitBreaker');
const Queue = require('./Queue');

class EmailService {
    constructor(providers) {
        this.providers = providers;
        this.rateLimiter = new RateLimiter(5, 10000); // 5 requests per 10 seconds
        this.circuitBreaker = new CircuitBreaker(3, 30000); // 3 failures, 30 sec reset
        this.queue = new Queue();
        this.sentEmails = new Set();
    }

    async sendEmail(id, email, content) {
        if (this.sentEmails.has(id)) {
            console.log(`Email with id ${id} has already been sent.`);
            return false;
        }

        if (!this.rateLimiter.canSend()) {
            console.log("Rate limit exceeded");
            return false;
        }

        const task = async () => {
            let sent = false;
            for (let i = 0; i < this.providers.length; i++) {
                const provider = this.providers[i];
                try {
                    sent = await this.circuitBreaker.call(() => provider.send(email, content));
                    if (sent) {
                        this.sentEmails.add(id);
                        console.log(`Email successfully sent via provider ${i + 1}`);
                        break;
                    }
                } catch (error) {
                    console.log(`Provider ${i + 1} failed: ${error.message}`);
                    await this.delay(this.getExponentialBackoff(i));
                }
            }

            if (!sent) {
                console.log("All providers failed");
                return false;
            }

            return true;
        };

        await this.queue.add(task);
        return true;
    }

    getExponentialBackoff(attempt) {
        return Math.pow(2, attempt) * 1000; // Exponential backoff
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = EmailService;
