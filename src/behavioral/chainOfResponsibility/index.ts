// Chain of Responsibility Pattern Implementation

// Abstract handler class
abstract class LogHandler {
    protected nextHandler: LogHandler | null = null;

    setNext(handler: LogHandler): LogHandler {
        this.nextHandler = handler;
        return handler;
    }

    handle(logLevel: string, message: string): void {
        if (this.nextHandler) {
            this.nextHandler.handle(logLevel, message);
        }
    }
}

// Concrete handlers
export class InfoLogHandler extends LogHandler {
    handle(logLevel: string, message: string): void {
        if (logLevel === 'INFO') {
            console.log(`Info: ${message}`);
        } else {
            super.handle(logLevel, message);
        }
    }
}

export class WarningLogHandler extends LogHandler {
    handle(logLevel: string, message: string): void {
        if (logLevel === 'WARNING') {
            console.warn(`Warning: ${message}`);
        } else {
            super.handle(logLevel, message);
        }
    }
}

export class ErrorLogHandler extends LogHandler {
    handle(logLevel: string, message: string): void {
        if (logLevel === 'ERROR') {
            console.error(`Error: ${message}`);
        } else {
            super.handle(logLevel, message);
        }
    }
}

// Usage example
export function chainOfResponsibilityExample(): void {
    const infoHandler = new InfoLogHandler();
    const warningHandler = new WarningLogHandler();
    const errorHandler = new ErrorLogHandler();

    infoHandler.setNext(warningHandler);
    warningHandler.setNext(errorHandler);

    // Handle different log levels
    infoHandler.handle('INFO', 'This is an information message');
    infoHandler.handle('WARNING', 'This is a warning message');
    infoHandler.handle('ERROR', 'This is an error message');
}
