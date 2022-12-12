import DirContent from '@general/DirContent';
import Loader from '@lib/Loader';
import Head from 'next/head';

import { useMyFilesQuery } from '@store/reducers/fs/api';

import { getMainLayout } from '@components/layouts/MainLayout';

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

Homepage.getLayout = getMainLayout;

export default Homepage;
