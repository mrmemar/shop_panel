export interface Column {
    name: string;
    value: string;
    type: 'boolean' | 'string' | 'email' | 'date' | 'model' | 'image' | 'number' | 'action' | 'imageArray';
    prop?: string;
    width?: string;
}
