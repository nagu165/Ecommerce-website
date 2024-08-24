export type SearchParams = {
    pages?: string;
    sortBy: string;
    minPrice?: string;
    maxPrice?: string;
};

type PageResult = {
    id: number; // FakeStoreAPI uses numeric IDs
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number; // Rating value
        count: number; // Number of ratings
    };
};

type Content = {
    results: PageResult[]; // Array of products
    last_visible_page: number;
    parse_status_code: number;
};

type Results = {
    filters: Filter[];
    organic: Organic[]; // Assuming organic results are products
    search_information: {
        query: string;
        showing_results_for: number;
    };
};

type Filter = {
    name: string;
    values: Value[];
};

type Value = {
    url: string;
    value: string;
};

type Organic = {
    id: number; // Product ID
    title: string;
    price: number;
    category: string;
    image: string;
    rating: {
        rate: number; // Rating value
        count: number; // Number of ratings
    };
};

export type ProductData = {
    id: number; // Product ID
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating: {
        rate: number; // Rating value
        count: number; // Number of ratings
    };
};

export type ProductContent = {
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating: {
        rate: number; // Rating value
        count: number; // Number of ratings
    };
};