// Observer Pattern Implementation

// Observer interface
interface NewsObserver {
    update(news: string): void;
}

// Subject interface
interface NewsAgency {
    attach(observer: NewsObserver): void;
    detach(observer: NewsObserver): void;
    notify(news: string): void;
}

// Concrete Subject
export class NewsAgencyImpl implements NewsAgency {
    private observers: Set<NewsObserver> = new Set();
    private latestNews: string = '';

    attach(observer: NewsObserver): void {
        this.observers.add(observer);
    }

    detach(observer: NewsObserver): void {
        this.observers.delete(observer);
    }

    notify(news: string): void {
        this.latestNews = news;
        for (const observer of this.observers) {
            observer.update(news);
        }
    }

    publishNews(news: string): void {
        console.log(`NewsAgency: Publishing news - ${news}`);
        this.notify(news);
    }
}

// Concrete Observers
export class NewsChannel implements NewsObserver {
    private name: string;
    private newsLog: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    update(news: string): void {
        this.newsLog.push(news);
        console.log(`${this.name} received news: ${news}`);
    }

    getNewsLog(): string[] {
        return this.newsLog;
    }
}

export class NewsWebsite implements NewsObserver {
    private url: string;
    private breakingNews: string | null = null;

    constructor(url: string) {
        this.url = url;
    }

    update(news: string): void {
        this.breakingNews = news;
        console.log(`${this.url} updated breaking news: ${news}`);
    }

    getBreakingNews(): string | null {
        return this.breakingNews;
    }
}

// Usage example
export function observerExample(): void {
    const newsAgency = new NewsAgencyImpl();

    const bbcNews = new NewsChannel('BBC News');
    const cnnNews = new NewsChannel('CNN News');
    const newsWebsite = new NewsWebsite('www.news.com');

    // Attach observers
    newsAgency.attach(bbcNews);
    newsAgency.attach(cnnNews);
    newsAgency.attach(newsWebsite);

    // Publish news
    newsAgency.publishNews('Breaking: Important event occurred!');

    // Detach one observer
    newsAgency.detach(cnnNews);

    // Publish another news
    newsAgency.publishNews('Update: More details about the event...');

    // Check news log
    console.log('BBC News log:', bbcNews.getNewsLog());
    console.log('Website breaking news:', newsWebsite.getBreakingNews());
}
