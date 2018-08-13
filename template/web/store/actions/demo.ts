export const DEMO = 'DEMO';
export const demoAction = (status: number): CFTypings.DemoAction => ({
  type: DEMO,
  status,
});
