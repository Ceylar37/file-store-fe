import AuthForm from '@general/AuthForm/AuthForm';
import Head from 'next/head';

import { useMyFilesQuery } from '@store/reducers/fs/api';

const Homepage = () => {
  const { data, error } = useMyFilesQuery();

  if (typeof document !== 'undefined') {
    console.log(document.cookie);
  }

  return (
    <>
      <Head>
        <title>FS</title>
      </Head>
      <AuthForm />
      <div>bruh</div>
    </>
  );
};

export default Homepage;
