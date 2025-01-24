// Interface for database operations
export interface DatabaseConnection {
    connect(): void;
    disconnect(): void;
    executeQuery(query: string): void;
    getConnectionStatus(): boolean;
} 