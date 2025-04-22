// Template Method Pattern Implementation

// Abstract class defining the template method
export abstract class DataMiner {
    // Template method
    mine(path: string): void {
        const file = this.openFile(path);
        const rawData = this.extractData(file);
        const processedData = this.parseData(rawData);
        const analysis = this.analyzeData(processedData);
        this.sendReport(analysis);
        this.closeFile(file);
    }

    // Abstract methods to be implemented by subclasses
    protected abstract openFile(path: string): any;
    protected abstract extractData(file: any): string;
    protected abstract closeFile(file: any): void;

    // Common methods with default implementation
    protected parseData(rawData: string): any[] {
        console.log('Parsing data...');
        return rawData.split('\n').map(line => line.trim());
    }

    protected analyzeData(data: any[]): string {
        console.log('Analyzing data...');
        return `Analysis results: ${data.length} records processed`;
    }

    protected sendReport(analysis: string): void {
        console.log('Sending report...');
        console.log(analysis);
    }
}

// Concrete implementation for CSV files
export class CSVDataMiner extends DataMiner {
    protected openFile(path: string): any {
        console.log(`Opening CSV file: ${path}`);
        return { path, type: 'csv' };
    }

    protected extractData(file: any): string {
        console.log('Extracting data from CSV file...');
        return 'data1,data2,data3\nvalue1,value2,value3';
    }

    protected closeFile(file: any): void {
        console.log(`Closing CSV file: ${file.path}`);
    }
}

// Concrete implementation for PDF files
export class PDFDataMiner extends DataMiner {
    protected openFile(path: string): any {
        console.log(`Opening PDF file: ${path}`);
        return { path, type: 'pdf' };
    }

    protected extractData(file: any): string {
        console.log('Extracting data from PDF file...');
        return 'Table 1: data1 data2 data3\nRow 1: value1 value2 value3';
    }

    protected closeFile(file: any): void {
        console.log(`Closing PDF file: ${file.path}`);
    }

    // Override default implementation for PDF-specific parsing
    protected parseData(rawData: string): any[] {
        console.log('Parsing PDF data with special formatting...');
        return rawData
            .split('\n')
            .map(line => line.split(':')[1]?.trim())
            .filter(Boolean);
    }
}

// Concrete implementation for Database
export class DatabaseDataMiner extends DataMiner {
    protected openFile(path: string): any {
        console.log(`Opening database connection: ${path}`);
        return { connection: 'db_connection', database: path };
    }

    protected extractData(file: any): string {
        console.log(`Executing SQL query on database: ${file.database}`);
        return 'SELECT * FROM table1\nROW1: col1, col2, col3';
    }

    protected closeFile(file: any): void {
        console.log(`Closing database connection: ${file.database}`);
    }

    // Override analysis for database-specific metrics
    protected analyzeData(data: any[]): string {
        const baseAnalysis = super.analyzeData(data);
        return `${baseAnalysis}\nDatabase-specific metrics: Query execution time: 0.5s`;
    }
}

// Usage example
export function templateMethodExample(): void {
    console.log('=== CSV Mining Process ===');
    const csvMiner = new CSVDataMiner();
    csvMiner.mine('data.csv');

    console.log('\n=== PDF Mining Process ===');
    const pdfMiner = new PDFDataMiner();
    pdfMiner.mine('report.pdf');

    console.log('\n=== Database Mining Process ===');
    const dbMiner = new DatabaseDataMiner();
    dbMiner.mine('customers_db');
}
