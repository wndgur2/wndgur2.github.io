import _Category from "./_Category";

export default interface _Post {
    [index: string]: number | string | _Category | string[] | undefined;
    id: string;
    category: _Category;
    title: string;
    content: string;
    tags: string[];
    date_started: string;

    site?: string;
    number?: number;

    thumbnail?: string;
    description?: string;
    date_finished?: string;
    github?: string;
}