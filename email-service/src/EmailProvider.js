class MockEmailProvider1 {
    async send(email, content) {
        // Simulate random failure
        if (Math.random() > 0.7) {
            throw new Error("Provider 1 failed");
        }
        console.log(`Email sent by Provider 1 to ${email}`);
        return true;
    }
}

class MockEmailProvider2 {
    async send(email, content) {
        // Simulate random failure
        if (Math.random() > 0.7) {
            throw new Error("Provider 2 failed");
        }
        console.log(`Email sent by Provider 2 to ${email}`);
        return true;
    }
}

module.exports = { MockEmailProvider1, MockEmailProvider2 };
