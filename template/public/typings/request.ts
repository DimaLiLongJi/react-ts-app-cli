export interface HLJResponse<T = any> {
  code: number;
  description: string;
  lastUpdateTime?: string;
  payload: T;
}
