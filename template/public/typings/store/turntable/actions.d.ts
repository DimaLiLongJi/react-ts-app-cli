export type TURNTABLE = 'TURNTABLE'

interface FetchMiddleWare {
    stage?: string;
    result?: any;
    originalType?: string;
    error?: any;
}

export type TurntableActions = TurntableAction;

export interface TurntableAction extends FetchMiddleWare {
    status: number;
    type: TURNTABLE;
}