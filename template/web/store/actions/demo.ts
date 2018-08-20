export const DEMO = 'DEMO';
export const demoAction = (status: number): Typings.DemoAction => ({
  type: DEMO,
  status,
});
