class Queue {
    constructor() {
        this.queue = [];
    }

    async add(task) {
        this.queue.push(task);
        if (this.queue.length === 1) {
            await this.run();
        }
    }

    async run() {
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            if (task) {
                await task();
            }
        }
    }
}

module.exports = Queue;
