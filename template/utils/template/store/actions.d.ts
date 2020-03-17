export type $needReplaceUpToken$ = '$needReplaceUpToken$'

interface FetchMiddleWare {
    stage?: string;
    result?: any;
    originalType?: string;
    error?: any;
}

export type $needReplaceUpLowToken$Actions = $needReplaceUpLowToken$Action;

export interface $needReplaceUpLowToken$Action extends FetchMiddleWare {
    status: number;
    type: $needReplaceUpToken$;
}