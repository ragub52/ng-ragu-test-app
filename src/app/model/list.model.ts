/**
 * Item
 */
export interface Item {
    id: number;
    name: string;
    description: string;
}

export interface ListState {
    items: Array<Item>;
    loading: boolean;
    error: string | null;
}