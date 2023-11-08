import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec?: object | string | undefined;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'NextJS Swagger',
        description:
          '<h2><b>base url: https://file-store-fe-i3vo.vercel.app/api/</b></h2>',
      },
    },
    apiFolder: 'src/pages/api',
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
