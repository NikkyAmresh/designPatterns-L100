

// Singleton Pattern Implementation

// Connection configuration type
type DatabaseConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    maxConnections: number;
};

// Connection pool status type
type ConnectionStatus = {
    id: number;
    inUse: boolean;
    lastUsed: Date;
};

/**
 * Database Connection Manager implementing the Singleton pattern
 * Handles connection pooling and configuration management
 */
export class DatabaseConnectionManager {
    private static instance: DatabaseConnectionManager | null = null;
    private config: DatabaseConfig;
    private connectionPool: Map<number, ConnectionStatus>;
    private isInitialized: boolean = false;

    private constructor() {
        this.connectionPool = new Map();
        // Default configuration
        this.config = {
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'admin',
            database: 'mydb',
            maxConnections: 10
        };
    }

    /**
     * Gets the singleton instance of DatabaseConnectionManager
     */
    public static getInstance(): DatabaseConnectionManager {
        if (!DatabaseConnectionManager.instance) {
            DatabaseConnectionManager.instance = new DatabaseConnectionManager();
        }
        return DatabaseConnectionManager.instance;
    }

    /**
     * Initializes the connection manager with configuration
     */
    public initialize(config: Partial<DatabaseConfig>): void {
        if (this.isInitialized) {
            console.warn('DatabaseConnectionManager is already initialized');
            return;
        }

        this.config = { ...this.config, ...config };
        this.initializeConnectionPool();
        this.isInitialized = true;
        console.log('DatabaseConnectionManager initialized with configuration:', this.config);
    }

    /**
     * Gets a connection from the pool
     */
    public getConnection(): number {
        // Find first available connection
        for (const [id, status] of this.connectionPool.entries()) {
            if (!status.inUse) {
                status.inUse = true;
                status.lastUsed = new Date();
                console.log(`Connection ${id} acquired from pool`);
                return id;
            }
        }

        throw new Error('No available connections in the pool');
    }

    /**
     * Releases a connection back to the pool
     */
    public releaseConnection(connectionId: number): void {
        const connection = this.connectionPool.get(connectionId);
        if (connection) {
            connection.inUse = false;
            connection.lastUsed = new Date();
            console.log(`Connection ${connectionId} released back to pool`);
        } else {
            throw new Error(`Invalid connection ID: ${connectionId}`);
        }
    }

    /**
     * Gets the current connection pool status
     */
    public getPoolStatus(): { total: number; active: number; available: number } {
        let active = 0;
        this.connectionPool.forEach(status => {
            if (status.inUse) active++;
        });

        return {
            total: this.connectionPool.size,
            active,
            available: this.connectionPool.size - active
        };
    }

    /**
     * Gets the current configuration
     */
    public getConfig(): DatabaseConfig {
        return { ...this.config };
    }

    /**
     * Simulates executing a query (for demonstration)
     */
    public executeQuery(connectionId: number, query: string): void {
        const connection = this.connectionPool.get(connectionId);
        if (!connection || !connection.inUse) {
            throw new Error('Invalid or inactive connection');
        }

        console.log(`Executing query on connection ${connectionId}: ${query}`);
    }

    private initializeConnectionPool(): void {
        for (let i = 0; i < this.config.maxConnections; i++) {
            this.connectionPool.set(i, {
                id: i,
                inUse: false,
                lastUsed: new Date()
            });
        }
        console.log(`Connection pool initialized with ${this.config.maxConnections} connections`);
    }
}

// Usage example
export function singletonExample(): void {
    console.log('=== Database Connection Manager Example ===');

    // Get instance and initialize with custom config
    const dbManager = DatabaseConnectionManager.getInstance();
    dbManager.initialize({
        host: 'db.example.com',
        port: 5432,
        maxConnections: 5
    });

    // Try to initialize again (should show warning)
    dbManager.initialize({ host: 'another.example.com' });

    // Get another instance (should be the same)
    const anotherDbManager = DatabaseConnectionManager.getInstance();
    console.log('Same instance:', dbManager === anotherDbManager);

    try {
        // Get connection and execute query
        console.log('\n=== Connection Usage Example ===');
        const connectionId = dbManager.getConnection();
        console.log('Pool status after getting connection:', dbManager.getPoolStatus());

        dbManager.executeQuery(connectionId, 'SELECT * FROM users');
        dbManager.releaseConnection(connectionId);
        console.log('Pool status after releasing connection:', dbManager.getPoolStatus());

        // Get multiple connections
        console.log('\n=== Multiple Connections Example ===');
        const connections = [];
        for (let i = 0; i < 3; i++) {
            connections.push(dbManager.getConnection());
        }
        console.log('Pool status with multiple connections:', dbManager.getPoolStatus());

        // Release all connections
        connections.forEach(connId => dbManager.releaseConnection(connId));
        console.log('Pool status after releasing all:', dbManager.getPoolStatus());

    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}
