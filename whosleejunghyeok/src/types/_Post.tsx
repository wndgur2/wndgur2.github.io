import _Category from "./_Category";

export default interface _Post {
    [index: string]: number | string | _Category | string[] | undefined;
    id: string;
    category: _Category;
    title: string;
    content: string;
    tags: string[];
    date_started: string;
    github: string;

    site?: string;
    number?: number;
    code?: string;
    language?: string;

    thumbnail?: string;
    description?: string;
    date_finished?: string;
}