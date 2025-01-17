// https://nextjs.org/docs/messages/sync-dynamic-apis
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#params--searchparams

import { use } from "react";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

/*
// Required if using output: "export" option to export static contents
// https://nextjs.org/docs/app/building-your-application/deploying/static-exports
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
export async function generateStaticParams() {
  return [
    { slug: "hello"},
    { slug: "bye"},
  ];
}
*/

export default function SyncSlugPage({ params }: Props) {
  const { slug } = use(params);
  return <h3>Slug: {slug}</h3>;
}
