export interface Form {
    name: string;
    type: "text" | "number" | "image" | "textarea" | "select" | "imageArray";
    label: string;
    rules?: Array<'email' | 'required'>;
    error?: string;
    options?: Array<any>;
}

