/**
 * Item
 */
export interface Item {
    id: number;
    name: string;
    description: string;
}

/**
 * List state model
 */
export interface ListState {
    items: Array<Item>;
    loading: boolean;
    error: string | null;
}