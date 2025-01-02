// https://nextjs.org/docs/messages/sync-dynamic-apis
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#params--searchparams

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: `Foo Bar page: ${slug}` };
}

export default async function AsyncSlugPage({ params }: Props) {
  const { slug } = await params;
  return <h3>Slug: {slug}</h3>;
}
