export type AssetStatus =
    | "active"
    | "maintenance"
    | "damaged"
    | "disposed";

export type AssetCondition =
    | "excellent"
    | "good"
    | "fair"
    | "poor";

export interface Asset {
    id: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    serialNumber: string;
    location: string;
    department: string;
    condition: AssetCondition;
    status: AssetStatus;
    purchaseDate: string;
    warrantyExpiry: string;
}
