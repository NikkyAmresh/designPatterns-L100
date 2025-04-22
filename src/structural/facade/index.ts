// Facade Pattern Implementation

// Complex subsystem classes
class VideoFile {
    constructor(private filename: string, private codecType: string) {}

    public getFilename(): string {
        return this.filename;
    }

    public getCodecType(): string {
        return this.codecType;
    }
}

class CodecFactory {
    public extract(file: VideoFile): Codec {
        const type = file.getCodecType();
        if (type.includes('mp4')) {
            return new MPEG4CompressionCodec();
        } else if (type.includes('ogg')) {
            return new OggCompressionCodec();
        } else {
            throw new Error(`Unsupported codec type: ${type}`);
        }
    }
}

interface Codec {
    type: string;
    compress(data: string): string;
    decompress(data: string): string;
}

class MPEG4CompressionCodec implements Codec {
    public type = 'mp4';

    public compress(data: string): string {
        console.log('Applying MP4 compression...');
        return `[Compressed MP4] ${data}`;
    }

    public decompress(data: string): string {
        console.log('Applying MP4 decompression...');
        return data.replace('[Compressed MP4] ', '');
    }
}

class OggCompressionCodec implements Codec {
    public type = 'ogg';

    public compress(data: string): string {
        console.log('Applying Ogg compression...');
        return `[Compressed OGG] ${data}`;
    }

    public decompress(data: string): string {
        console.log('Applying Ogg decompression...');
        return data.replace('[Compressed OGG] ', '');
    }
}

class BitrateReader {
    public static read(filename: string, codec: Codec): string {
        console.log(`Reading file ${filename} using ${codec.type} codec...`);
        return `[Raw video data from ${filename}]`;
    }

    public static convert(buffer: string, codec: Codec): string {
        console.log(`Converting bitrate using ${codec.type} codec...`);
        return codec.compress(buffer);
    }
}

class AudioMixer {
    public fix(videoFile: string): string {
        console.log('Fixing audio...');
        return `[Audio fixed] ${videoFile}`;
    }
}

// Facade
export class VideoConverter {
    private codecFactory: CodecFactory;
    private audioMixer: AudioMixer;

    constructor() {
        this.codecFactory = new CodecFactory();
        this.audioMixer = new AudioMixer();
    }

    public convertVideo(filename: string, format: string): string {
        console.log(`\nConverting video ${filename} to ${format}...`);
        
        // Create video file object
        const file = new VideoFile(filename, format);
        
        // Extract codec
        const sourceCodec = this.codecFactory.extract(file);
        
        // If we're converting to a different format, get the destination codec
        let destinationCodec: Codec;
        if (format !== sourceCodec.type) {
            destinationCodec = format === 'mp4' 
                ? new MPEG4CompressionCodec() 
                : new OggCompressionCodec();
        } else {
            destinationCodec = sourceCodec;
        }

        // Read and convert the file
        let buffer = BitrateReader.read(filename, sourceCodec);
        let result = BitrateReader.convert(buffer, destinationCodec);
        
        // Fix the audio
        result = this.audioMixer.fix(result);

        return result;
    }
}

// Usage example
export function facadeExample(): void {
    const converter = new VideoConverter();

    console.log('=== Video Conversion Example ===');

    // Convert from MP4 to OGG
    try {
        const mp4Result = converter.convertVideo('funny-cats.mp4', 'ogg');
        console.log('Conversion result:', mp4Result);
    } catch (error) {
        console.error('Conversion failed:', (error as Error).message);
    }

    // Convert from OGG to MP4
    try {
        const oggResult = converter.convertVideo('game-soundtrack.ogg', 'mp4');
        console.log('\nConversion result:', oggResult);
    } catch (error) {
        console.error('Conversion failed:', (error as Error).message);
    }

    // Try converting unsupported format
    try {
        converter.convertVideo('movie.avi', 'mp4');
    } catch (error) {
        console.error('\nConversion failed:', (error as Error).message);
    }
}
