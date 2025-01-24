import { DatabaseConnectionManager } from '../index';

console.log('Database Connection Example using Singleton Pattern\n');

// Get two references to the database manager
const dbManager1 = DatabaseConnectionManager.getInstance();
const dbManager2 = DatabaseConnectionManager.getInstance();

// Verify both references point to the same instance
console.log('Are both instances the same?', dbManager1 === dbManager2);
console.log();

// First connection attempt
console.log('First connection attempt:');
dbManager1.connect();
console.log();

// Second connection attempt with different reference
console.log('Second connection attempt:');
dbManager2.connect(); // Will show 'Already connected'
console.log();

// Run some example queries
try {
    console.log('Executing queries:');
    dbManager1.executeQuery('SELECT * FROM users');
    dbManager2.executeQuery('UPDATE users SET status = "active"');
} catch (error) {
    console.error('Error executing queries:', error);
}
console.log();

// Disconnect from database
console.log('Disconnecting:');
dbManager1.disconnect();
console.log();

// Try query after disconnection to show error handling
try {
    console.log('Trying to execute query after disconnection:');
    dbManager2.executeQuery('SELECT * FROM products');
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error('Error:', error.message);
    }
}
