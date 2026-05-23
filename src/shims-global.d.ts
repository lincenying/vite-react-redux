/**
 * Null 或者 Undefined 或者 T
 */
declare type Nullable<T> = T | null | undefined

/**
 * 键为字符串的对象
 */
declare type Objable<T = unknown> = Record<string, T>

declare interface Window {
    $timeout: Record<string, ReturnType<typeof window.setTimeout>>
}
