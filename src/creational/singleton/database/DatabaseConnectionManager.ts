import { DatabaseConnection } from '../interfaces/DatabaseConnection';
import { DatabaseConfig, DEFAULT_CONFIG } from '../config/DatabaseConfig';

/**
 * A singleton DatabaseConnectionManager that ensures only one database connection
 * exists throughout the application. Think of it as a shared connection pool
 * that everyone in the application uses.
 */
export class DatabaseConnectionManager implements DatabaseConnection {
    private static instance: DatabaseConnectionManager;
    private connectionString: string;
    private isConnected: boolean = false;

    private constructor(config: DatabaseConfig = DEFAULT_CONFIG) {
        // Private constructor ensures no new instances can be created with 'new'
        this.connectionString = config.connectionString;
    }

    public static getInstance(config?: DatabaseConfig): DatabaseConnectionManager {
        if (!DatabaseConnectionManager.instance) {
            DatabaseConnectionManager.instance = new DatabaseConnectionManager(config);
        }
        return DatabaseConnectionManager.instance;
    }

    public connect(): void {
        if (!this.isConnected) {
            // Establish database connection
            console.log(`Connecting to database with connection string: ${this.connectionString}`);
            this.isConnected = true;
        } else {
            console.log('Already connected to database');
        }
    }

    public disconnect(): void {
        if (this.isConnected) {
            // Close the database connection
            console.log('Disconnecting from database');
            this.isConnected = false;
        } else {
            console.log('Already disconnected from database');
        }
    }

    public executeQuery(query: string): void {
        if (!this.isConnected) {
            throw new Error('Not connected to database');
        }
        console.log(`Executing query: ${query}`);
    }

    // Helper method for connection status
    public getConnectionStatus(): boolean {
        return this.isConnected;
    }
} 