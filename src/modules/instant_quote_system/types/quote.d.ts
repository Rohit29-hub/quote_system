export interface Feature {
    feature_name: string;
    available_for_this_package: boolean;
}

export interface Quote {
    quote_level: string;
    features: Feature[];
    price: string;
}

export interface Service {
    service_id: string;
    service_name: string;
    description: string;
    quote: Quote[];
}