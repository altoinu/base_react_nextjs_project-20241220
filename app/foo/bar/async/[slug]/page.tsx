// https://nextjs.org/docs/messages/sync-dynamic-apis
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#params--searchparams

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

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: `Foo Bar page: ${slug}` };
}

export default async function AsyncSlugPage({ params }: Props) {
  const { slug } = await params;
  return <h3>Slug: {slug}</h3>;
}
