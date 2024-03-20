import { Category } from "./category.model";

export interface Product {

    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    sold: number;
    price: number;
    priceAfterDiscount: number;
    colors: [];
    imageCover: string;
    images: string[];
    category: Category;
    subcategories: [];
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
    id: string;

}
