export interface ICacheService<Object> {
    cache: Object[];

    get(): Promise<Object[]>;

    clean(): void;
}
