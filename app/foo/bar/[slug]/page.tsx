type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Foo Bar page: ${params.slug}` };
}

const SlugPage = ({ params: { slug } }: Params) => {
  return <h3>Slug: {slug}</h3>;
};

export default SlugPage;
