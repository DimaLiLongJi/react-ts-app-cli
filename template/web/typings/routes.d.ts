import * as H from 'history';

export interface Match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

export interface StaticContext {
    statusCode?: number;
}
export interface RouteComponentProps<P, C extends StaticContext = StaticContext> {
    history: H.History;
    location: H.Location;
    match: Match<P>;
    staticContext?: C;
}

export interface RouteProps<P, C extends StaticContext = StaticContext> {
    location?: H.Location;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: ((props: RouteComponentProps<any>) => React.ReactNode);
    children?: ((props: RouteComponentProps<any>) => React.ReactNode) | React.ReactNode;
    path?: string;
    exact?: boolean;
    strict?: boolean;
    match?: Match<P>;
    taticContext?: C;
    staticContext?: C;
    history?: H.History;
  }
