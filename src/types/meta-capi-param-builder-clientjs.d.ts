declare module "meta-capi-param-builder-clientjs" {
  const clientParamBuilder: {
    processAndCollectAllParams: (url?: string) => Promise<unknown>;
    getFbc: () => string | undefined;
    getFbp: () => string | undefined;
  };
  export default clientParamBuilder;
}
