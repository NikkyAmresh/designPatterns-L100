// Database configuration type
export type DatabaseConfig = {
    connectionString: string;
}

// Default configuration
export const DEFAULT_CONFIG: DatabaseConfig = {
    connectionString: process.env.DB_CONNECTION_STRING || 'default://localhost:5432/db'
}; 