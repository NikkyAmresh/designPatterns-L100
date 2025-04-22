// Builder Pattern Implementation

// Product
export class Computer {
    private parts: string[] = [];

    public addPart(part: string): void {
        this.parts.push(part);
    }

    public listParts(): void {
        console.log(`Computer parts: ${this.parts.join(', ')}`);
    }

    public getSpecifications(): Record<string, string> {
        const specs: Record<string, string> = {};
        this.parts.forEach(part => {
            const [key, value] = part.split(': ');
            specs[key] = value;
        });
        return specs;
    }
}

// Builder interface
interface ComputerBuilder {
    reset(): void;
    setCPU(cpu: string): void;
    setMemory(memory: string): void;
    setStorage(storage: string): void;
    setGraphics(graphics: string): void;
    getResult(): Computer;
}

// Concrete Builder for Gaming Computer
export class GamingComputerBuilder implements ComputerBuilder {
    private computer: Computer;

    constructor() {
        this.computer = new Computer();
    }

    public reset(): void {
        this.computer = new Computer();
    }

    public setCPU(cpu: string): void {
        this.computer.addPart(`CPU: ${cpu}`);
    }

    public setMemory(memory: string): void {
        this.computer.addPart(`Memory: ${memory}`);
    }

    public setStorage(storage: string): void {
        this.computer.addPart(`Storage: ${storage}`);
    }

    public setGraphics(graphics: string): void {
        this.computer.addPart(`Graphics: ${graphics}`);
    }

    public getResult(): Computer {
        const result = this.computer;
        this.reset();
        return result;
    }
}

// Concrete Builder for Office Computer
export class OfficeComputerBuilder implements ComputerBuilder {
    private computer: Computer;

    constructor() {
        this.computer = new Computer();
    }

    public reset(): void {
        this.computer = new Computer();
    }

    public setCPU(cpu: string): void {
        this.computer.addPart(`CPU: ${cpu}`);
    }

    public setMemory(memory: string): void {
        this.computer.addPart(`Memory: ${memory}`);
    }

    public setStorage(storage: string): void {
        this.computer.addPart(`Storage: ${storage}`);
    }

    public setGraphics(graphics: string): void {
        this.computer.addPart(`Graphics: ${graphics}`);
    }

    public getResult(): Computer {
        const result = this.computer;
        this.reset();
        return result;
    }
}

// Director
export class ComputerAssembler {
    private builder: ComputerBuilder;

    constructor(builder: ComputerBuilder) {
        this.builder = builder;
    }

    public setBuilder(builder: ComputerBuilder): void {
        this.builder = builder;
    }

    public constructGamingComputer(): void {
        this.builder.reset();
        this.builder.setCPU('Intel Core i9-12900K');
        this.builder.setMemory('32GB DDR5-6000');
        this.builder.setStorage('2TB NVMe SSD');
        this.builder.setGraphics('NVIDIA RTX 4090');
    }

    public constructOfficeComputer(): void {
        this.builder.reset();
        this.builder.setCPU('Intel Core i5-12400');
        this.builder.setMemory('16GB DDR4-3200');
        this.builder.setStorage('512GB SSD');
        this.builder.setGraphics('Intel UHD Graphics 730');
    }
}

// Usage example
export function builderExample(): void {
    // Create builders
    const gamingBuilder = new GamingComputerBuilder();
    const officeBuilder = new OfficeComputerBuilder();

    // Create director and construct computers
    const assembler = new ComputerAssembler(gamingBuilder);

    // Construct a gaming computer
    console.log('=== Building Gaming Computer ===');
    assembler.constructGamingComputer();
    const gamingComputer = gamingBuilder.getResult();
    gamingComputer.listParts();

    // Switch builder and construct an office computer
    console.log('\n=== Building Office Computer ===');
    assembler.setBuilder(officeBuilder);
    assembler.constructOfficeComputer();
    const officeComputer = officeBuilder.getResult();
    officeComputer.listParts();

    // Get specifications
    console.log('\n=== Gaming Computer Specifications ===');
    console.log(gamingComputer.getSpecifications());

    console.log('\n=== Office Computer Specifications ===');
    console.log(officeComputer.getSpecifications());
}
