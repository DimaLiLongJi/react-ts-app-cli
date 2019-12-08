export type DEMOO1 = 'DEMOO1'

export interface FetchMiddleWare {
    stage?: string;
    result?: any;
    originalType?: string;
    error?: any;
}

export type Demoo1Actions = Demoo1Action;

export interface Demoo1Action extends FetchMiddleWare {
    status: number;
    type: DEMOO1;
}