import _Category from "./_Category";

interface _Post {
    [index: string]: number | string | _Category | string[] | undefined;
    id: string;
    category: _Category;
    title: string;
    content: string;
    tags: string[];
    date_started: string;
    github: string;
}

interface _Algorithm extends _Post {
    site: string;
    number: number;
    code: string;
}

interface _Project extends _Post {
    thumbnail: string;
    description: string;
    date_finished: string;
}

export type { _Post, _Algorithm, _Project };