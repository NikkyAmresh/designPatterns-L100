// Proxy Pattern Implementation

// Subject interface
interface VideoService {
    getVideo(id: string): string;
    uploadVideo(id: string, content: string): void;
}

// Real Subject
export class RealVideoService implements VideoService {
    private videos: Map<string, string> = new Map();

    public getVideo(id: string): string {
        console.log(`RealVideoService: Loading video ${id} from storage...`);
        return this.videos.get(id) || '';
    }

    public uploadVideo(id: string, content: string): void {
        console.log(`RealVideoService: Uploading video ${id} to storage...`);
        this.videos.set(id, content);
    }
}

// Proxy
export class VideoServiceProxy implements VideoService {
    private realService: RealVideoService;
    private cache: Map<string, string> = new Map();
    private authorizedUsers: Set<string> = new Set(['admin', 'editor']);

    constructor(service: RealVideoService) {
        this.realService = service;
    }

    public getVideo(id: string, user: string = 'guest'): string {
        console.log(`Proxy: Checking access for user ${user}...`);

        // Check cache first
        if (this.cache.has(id)) {
            console.log(`Proxy: Retrieving video ${id} from cache...`);
            return this.cache.get(id)!;
        }

        // Get video from real service
        const video = this.realService.getVideo(id);
        
        // Cache the result
        if (video) {
            console.log(`Proxy: Caching video ${id}...`);
            this.cache.set(id, video);
        }

        return video;
    }

    public uploadVideo(id: string, content: string, user: string = 'guest'): void {
        console.log(`Proxy: Checking upload permissions for user ${user}...`);

        // Check if user is authorized
        if (!this.authorizedUsers.has(user)) {
            throw new Error('Proxy: Access denied. User not authorized to upload videos.');
        }

        // Proceed with upload
        this.realService.uploadVideo(id, content);
        
        // Update cache
        this.cache.set(id, content);
    }

    // Additional proxy methods
    public clearCache(): void {
        console.log('Proxy: Clearing cache...');
        this.cache.clear();
    }

    public addAuthorizedUser(user: string): void {
        console.log(`Proxy: Adding ${user} to authorized users...`);
        this.authorizedUsers.add(user);
    }
}

// Usage example
export function proxyExample(): void {
    const realService = new RealVideoService();
    const proxy = new VideoServiceProxy(realService);

    console.log('=== Video Service Proxy Example ===\n');

    // Upload attempts
    console.log('1. Trying to upload as guest:');
    try {
        proxy.uploadVideo('video1', 'Funny Cats Compilation', 'guest');
    } catch (error) {
        console.error((error as Error).message);
    }

    console.log('\n2. Uploading as admin:');
    try {
        proxy.uploadVideo('video1', 'Funny Cats Compilation', 'admin');
    } catch (error) {
        console.error((error as Error).message);
    }

    // Accessing video
    console.log('\n3. First video access (from real service):');
    proxy.getVideo('video1');

    console.log('\n4. Second video access (from cache):');
    proxy.getVideo('video1');

    // Add new authorized user
    console.log('\n5. Adding new authorized user:');
    proxy.addAuthorizedUser('content_creator');

    // Upload with new authorized user
    console.log('\n6. Uploading as content creator:');
    try {
        proxy.uploadVideo('video2', 'Programming Tutorial', 'content_creator');
    } catch (error) {
        console.error((error as Error).message);
    }

    // Clear cache
    console.log('\n7. Clearing cache:');
    proxy.clearCache();

    // Access video again (will load from real service)
    console.log('\n8. Accessing video after cache clear:');
    proxy.getVideo('video1');
}
