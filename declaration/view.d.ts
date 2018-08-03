import { cEmitter } from "./cEmitter";
export declare class RadioSet {
    maps: HTMLUnknownElement[];
    private __index;
    constructor(rootElement: HTMLUnknownElement);
    injectEvents(): void;
    setIndex(index: number): void;
    index: number;
}
export declare class ResultList extends cEmitter {
    pages: {
        id: number;
        name: string;
        artist: string;
    }[][];
    point: number;
    MAX_ROWS_PER_PAGE: number;
    rootElement: HTMLUnknownElement;
    constructor(rootElement: HTMLUnknownElement, MaxRowsPerPage?: number);
    render(musicList: {
        id: number;
        name: string;
        artist: string;
    }[]): void;
    renderPage(): void;
    renderPrevAndNextButton(): void;
    slice(arrayList: any[], perLength: number): any[][];
}
