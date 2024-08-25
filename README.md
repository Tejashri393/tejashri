
# Email Sending Service

This project implements a resilient email sending service in JavaScript. The service is designed to handle various failures and ensures reliable email delivery using mock email providers. Key features include retry logic with exponential backoff, provider fallback, idempotency, rate limiting, status tracking, and a circuit breaker pattern.


Features

• Retry Mechanism: Retries sending emails with exponential backoff in case of failures.

• Fallback: Automatically switches between multiple email providers if one fails.

• Idempotency: Ensures that duplicate emails (based on unique ID) are not sent.

• Rate Limiting: Limits the number of emails sent within a specified time window.

• Status Tracking: Tracks and logs the status of each email sending attempt.

• Circuit Breaker: Prevents repeated failures by temporarily blocking failing providers.

• Queue System: Ensures that email sending tasks are handled sequentially.

• Logging: Simple console logging for monitoring and debugging.




## Roadmap

email-service/

src/

• EmailService.js

• EmailProvider.js

• RateLimiter.js

• CircuitBreaker.js

• Queue.js

• index.js

tests/

• EmailService.test.js

• EmailProvider.test.js

• RateLimiter.test.js

• CircuitBreaker.test.js

• Queue.test.js

package.json

jest.config.js

README.md




## Getting Started

Prerequisites

Ensure you have Node.js installed. You can download it from nodejs.org.




## Installation

1.	Clone the repository:

```bash
 git clone https://github.com/Tejashri393/tejashri.git
 cd email-service
```
2.	Install the required dependencies:

```bash
 npm install
```
## Running the Application

You can run the email sending service by executing the index.js file:

```bash
 node src/index.js
```

## Example Input

The service is pre-configured in index.js to send an email with the following parameters:

```bash
 emailService.sendEmail("1", "example@example.com", "Hello, this is a test email.");
```
## Expected Output

•	The service will attempt to send an email and log the result to the console.
•	It will also handle duplicate email IDs, retries, and provider fallback as needed.

Example output:

```bash
Email sent by Provider 1 to example@example.com
Email successfully sent via provider 1
Email with id 1 has already been sent.

```

## Running Tests

This project uses Jest for testing. To run the tests:
```bash
npm test
```
The test suite covers:

•	Email sending logic

•	Rate limiting

•	Circuit breaker behavior

•	Queue processing

## Configuration

You can configure certain parameters directly in the source code:

•	Rate Limiting: Adjust the number of allowed requests and time window in RateLimiter.js.

•	Circuit Breaker: Set failure thresholds and reset time in CircuitBreaker.js.

•	Retry Backoff: Modify the exponential backoff strategy in EmailService.js.





    





## Further Enhancements
Possible enhancements include:

•	Persistent Storage: Store sent email IDs in a database for long-term idempotency.

•	Real Email Providers: Integrate with actual email sending services like AWS SES.



## License

[MIT](https://choosealicense.com/licenses/mit/)




This README.md provides a clear and concise guide for setting up, running, and understanding the project. It also offers insight into the features and potential areas for further development.

