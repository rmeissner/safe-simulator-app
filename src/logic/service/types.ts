export interface Page<T> {
    next: string | null,
    results: T[]
}