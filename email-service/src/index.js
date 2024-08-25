const { MockEmailProvider1, MockEmailProvider2 } = require('./EmailProvider');
const EmailService = require('./EmailService');

const emailService = new EmailService([
    new MockEmailProvider1(),
    new MockEmailProvider2()
]);

emailService.sendEmail("1", "example@example.com", "Hello, this is a test email.");
emailService.sendEmail("1", "example@example.com", "Hello, this is a test email."); // Duplicate, should not send
