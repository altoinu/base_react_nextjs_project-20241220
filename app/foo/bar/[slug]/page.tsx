type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Foo Bar page: ${params.slug}` };
}

const SlugPage = ({ params }: Params) => {
  return <h3>Slug: {params.slug}</h3>;
};

export default SlugPage;
