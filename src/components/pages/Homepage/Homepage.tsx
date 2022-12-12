import DirContent from '@general/DirContent';
import Loader from '@lib/Loader';
import Head from 'next/head';

import { useMyFilesQuery } from '@store/reducers/fs/api';

const Homepage = () => {
  const { data, error } = useMyFilesQuery();

  return (
    <>
      <Head>
        <title>Authorization</title>
      </Head>
      {!data && !error && <Loader />}
      {data && <DirContent fs={data} />}
    </>
  );
};

export default Homepage;
