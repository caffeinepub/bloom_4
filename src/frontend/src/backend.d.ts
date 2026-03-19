import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BouquetRecord {
    id: string;
    greenery: Array<string>;
    imageKey: string;
    message: string;
    timestamp: bigint;
    flowers: Array<string>;
}
export interface backendInterface {
    createBouquet(flowers: Array<string>, greenery: Array<string>, message: string, imageKey: string): Promise<string>;
    getBouquet(id: string): Promise<BouquetRecord | null>;
    getRecentBouquets(limit: bigint): Promise<Array<BouquetRecord>>;
}
