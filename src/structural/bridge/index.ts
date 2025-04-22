// Bridge Pattern Implementation

// Implementation interface
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Concrete implementations
export class TV implements Device {
    private on: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    public isEnabled(): boolean {
        return this.on;
    }

    public enable(): void {
        this.on = true;
        console.log('TV turned on');
    }

    public disable(): void {
        this.on = false;
        console.log('TV turned off');
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(percent: number): void {
        this.volume = Math.max(0, Math.min(100, percent));
        console.log(`TV volume set to ${this.volume}%`);
    }

    public getChannel(): number {
        return this.channel;
    }

    public setChannel(channel: number): void {
        this.channel = channel;
        console.log(`TV channel set to ${this.channel}`);
    }
}

export class Radio implements Device {
    private on: boolean = false;
    private volume: number = 20;
    private channel: number = 87.5;  // FM frequency

    public isEnabled(): boolean {
        return this.on;
    }

    public enable(): void {
        this.on = true;
        console.log('Radio turned on');
    }

    public disable(): void {
        this.on = false;
        console.log('Radio turned off');
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(percent: number): void {
        this.volume = Math.max(0, Math.min(100, percent));
        console.log(`Radio volume set to ${this.volume}%`);
    }

    public getChannel(): number {
        return this.channel;
    }

    public setChannel(channel: number): void {
        // FM frequency range: 87.5 to 108.0 MHz
        this.channel = Math.max(87.5, Math.min(108.0, channel));
        console.log(`Radio frequency set to ${this.channel.toFixed(1)} MHz`);
    }
}

// Abstraction
abstract class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    public togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    public volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    public volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    public channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    public channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Refined Abstraction
export class BasicRemote extends RemoteControl {
    public showStatus(): void {
        console.log('--------------------');
        console.log('| Basic Remote Status |');
        console.log(`| Power: ${this.device.isEnabled() ? 'on' : 'off'}`);
        console.log(`| Volume: ${this.device.getVolume()}%`);
        console.log(`| Channel: ${this.device.getChannel()}`);
        console.log('--------------------');
    }
}

export class AdvancedRemote extends RemoteControl {
    public mute(): void {
        console.log('Mute activated');
        this.device.setVolume(0);
    }

    public showStatus(): void {
        console.log('========================');
        console.log('| Advanced Remote Status |');
        console.log(`| Power: ${this.device.isEnabled() ? 'on' : 'off'}`);
        console.log(`| Volume: ${this.device.getVolume()}%`);
        console.log(`| Channel: ${this.device.getChannel()}`);
        console.log('| Extra Features: Mute  |');
        console.log('========================');
    }
}

// Usage example
export function bridgeExample(): void {
    console.log('=== TV with Basic Remote ===');
    const tv = new TV();
    const basicRemote = new BasicRemote(tv);
    
    basicRemote.togglePower();
    basicRemote.channelUp();
    basicRemote.volumeUp();
    basicRemote.showStatus();

    console.log('\n=== Radio with Advanced Remote ===');
    const radio = new Radio();
    const advancedRemote = new AdvancedRemote(radio);
    
    advancedRemote.togglePower();
    advancedRemote.channelUp();
    advancedRemote.volumeUp();
    advancedRemote.mute();
    advancedRemote.showStatus();
}
