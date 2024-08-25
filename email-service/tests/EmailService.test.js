const EmailService = require('../src/EmailService');
const { MockEmailProvider1, MockEmailProvider2 } = require('../src/EmailProvider');

test('EmailService should send an email using available providers', async () => {
    const emailService = new EmailService([
        new MockEmailProvider1(),
        new MockEmailProvider2()
    ]);

    const result = await emailService.sendEmail("1", "test@example.com", "Test email content");
    expect(result).toBeTruthy();
});

test('EmailService should not resend duplicate emails', async () => {
    const emailService = new EmailService([
        new MockEmailProvider1(),
        new MockEmailProvider2()
    ]);

    await emailService.sendEmail("1", "test@example.com", "Test email content");
    const result = await emailService.sendEmail("1", "test@example.com", "Test email content");
    expect(result).toBeFalsy();
});

test('EmailService should respect rate limiting', async () => {
    const emailService = new EmailService([
        new MockEmailProvider1(),
        new MockEmailProvider2()
    ]);

    // Send multiple emails to trigger rate limiting
    for (let i = 0; i < 10; i++) {
        await emailService.sendEmail(`email${i}`, "test@example.com", "Test email content");
    }

    const result = await emailService.sendEmail("10", "test@example.com", "Test email content");
    expect(result).toBeFalsy();
});
