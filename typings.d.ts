export type SearchParams = {
    pages?: string;
    sortBy: string;
    minPrice?: string;
    maxPrice?: string;
};

export type ProductData = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export type Content = {
    results: ProductData[];
    last_visible_page: number;
    parse_status_code: number;
};

export type Results = {
    organic: ProductData[];
    search_information: {
        query: string;
        showing_results_for: number;
    };
};