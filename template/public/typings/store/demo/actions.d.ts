export type DEMO = 'DEMO'

interface FetchMiddleWare {
    stage?: string;
    result?: any;
    originalType?: string;
    error?: any;
}

export type DemoActions = DemoAction;

export interface DemoAction extends FetchMiddleWare {
    status: number;
    type: DEMO;
}