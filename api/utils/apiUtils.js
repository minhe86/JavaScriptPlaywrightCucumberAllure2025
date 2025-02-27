export function validateStatusCode(response, expectedStatus) {
    if (response.status !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, but got ${response.status}`);
    }
  }