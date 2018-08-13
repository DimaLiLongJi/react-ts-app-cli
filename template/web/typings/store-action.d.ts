export type DEMO = 'DEMO'

export interface FetchMiddleWare {
    stage?: string;
    result?: any;
    originalType?: string;
    error?: any;
}
export interface DemoAction extends FetchMiddleWare {
    status: number;
    type: DEMO;
}

