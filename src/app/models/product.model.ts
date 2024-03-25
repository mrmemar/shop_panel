import { Category } from "./category.model";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    categoryId: number;
    images: string[];
    creationAt: string;
    updatedAt: string;
}
