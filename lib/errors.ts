/**
 * Custom error types for VaultNote
 * Provides type-safe error handling across the application
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}

// Note-related errors
export class NoteNotFoundError extends AppError {
  constructor(message = 'Note not found or expired') {
    super(message, 404, 'NOTE_NOT_FOUND');
  }
}

export class NoteExpiredError extends AppError {
  constructor(message = 'Note has expired') {
    super(message, 410, 'NOTE_EXPIRED');
  }
}

export class NoteConsumedError extends AppError {
  constructor(message = 'Note has been consumed') {
    super(message, 410, 'NOTE_CONSUMED');
  }
}

export class InvalidPasswordError extends AppError {
  constructor(message = 'Invalid password') {
    super(message, 403, 'INVALID_PASSWORD');
  }
}

export class InvalidTokenError extends AppError {
  constructor(message = 'Invalid destroy token') {
    super(message, 403, 'INVALID_TOKEN');
  }
}

// Rate limiting and security errors
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class SuspiciousActivityError extends AppError {
  constructor(message = 'Suspicious activity detected') {
    super(message, 429, 'SUSPICIOUS_ACTIVITY');
  }
}

// Validation errors
export class ValidationError extends AppError {
  constructor(message: string, public details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

export class PayloadTooLargeError extends AppError {
  constructor(message = 'Payload too large') {
    super(message, 413, 'PAYLOAD_TOO_LARGE');
  }
}

export class ContentValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'CONTENT_VALIDATION_FAILED');
  }
}

// Encryption errors
export class EncryptionError extends AppError {
  constructor(message = 'Encryption failed') {
    super(message, 500, 'ENCRYPTION_ERROR');
  }
}

export class DecryptionError extends AppError {
  constructor(message = 'Decryption failed') {
    super(message, 500, 'DECRYPTION_ERROR');
  }
}

// Database errors
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

/**
 * Error handler utility for API routes
 */
export function handleError(error: unknown): { status: number; body: any } {
  // Known application errors
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      body: error.toJSON(),
    };
  }

  // Zod validation errors
  if (error && typeof error === 'object' && 'issues' in error) {
    return {
      status: 400,
      body: {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: (error as any).issues,
      },
    };
  }

  // Unknown errors - log but don't expose details
  console.error('Unexpected error:', error);
  return {
    status: 500,
    body: {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  };
}
