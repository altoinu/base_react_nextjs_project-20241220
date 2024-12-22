// https://nextjs.org/docs/messages/sync-dynamic-apis
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#params--searchparams

"use client";

import { use } from "react";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

const SlugPage = ({ params }: Props) => {
  const { slug } = use(params);
  return <h3>Slug: {slug}</h3>;
};

export default SlugPage;
