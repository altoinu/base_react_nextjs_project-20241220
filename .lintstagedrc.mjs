const linststagedConfig = {
  "*.{md,css,js,cjs,mjs,jsx,ts,cts,mts,tsx}": () => "npm run lint:fix",
};

export default linststagedConfig;
