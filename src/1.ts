export interface User {
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

export function createUser(id: number, name: string, email?: string): User {
    return {
        id: id,
        name: name,
        email: email,
        isActive: true
    };
}

export interface Book {
    title: string;
    author: string;
    year?: number;
    genre: 'fiction' | 'non-fiction';
}

export function createBook(book: Book): Book {
    return book;
}

export const book1 = createBook({
    title: "книга1",
    author: "Автор",
    year: 2003,
    genre: "fiction"
});

export const book2 = createBook({
    title: "книга1",
    author: "Автор",
    genre: "fiction"
});

export function calculateArea(shape: 'circle', dimensions: { radius: number }): number;
export function calculateArea(shape: 'square', dimensions: { side: number }): number;
export function calculateArea(shape: 'circle' | 'square', dimensions: any): number {
    if (shape === 'circle') {
        return Math.PI * dimensions.radius ** 2;
    }
    return dimensions.side ** 2;
}

export type Status = "active" | "inactive" | "new";

export function getStatusColor(status: Status): string {
    if (status === "active") return "green";
    else if (status === "new") return "yellow";
    else return "red";
}

export type StringFormatter = (str: string, uppercase?: boolean) => string;

export const UpperFirst: StringFormatter = (str: string, uppercase: boolean = false): string => {
    if (str.length == 0) return str;
    let result: string = str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
    return uppercase ? result.toUpperCase() : result;
};

export const TrimStr: StringFormatter = (str: string, uppercase: boolean = false): string => {
    if (str.length == 0) return str;
    const trimmed: string = str.trim();
    return uppercase ? trimmed.toUpperCase() : trimmed;
};

export function getFirstElement<T>(arr: T[]): T | undefined {
    if (arr.length == 0) return undefined;
    return arr[0];
}

export interface HasId {
    id: number;
}

export interface User1 extends HasId {
    name: string;
    email?: string;
}

export const users: User1[] = [
    { id: 1, name: 'Снежанна', email: 'sneg@mail.com' },
    { id: 2, name: 'Мария', email: 'mary@mail.com' },
    { id: 3, name: 'Вика' }
];

export function findById<T extends HasId>(items: T[], id: number): T | undefined {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
    }
    return undefined;
}