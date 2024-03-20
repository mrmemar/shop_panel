export interface Column {
    name: string;
    value: string;
    type: 'boolean' | 'string' | 'email' | 'date' | 'model' | 'image' | 'number';
    prop?: string;

}
