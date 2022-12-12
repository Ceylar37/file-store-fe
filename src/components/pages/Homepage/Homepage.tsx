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
        <title>File Store</title>
      </Head>
      {!data && !error && <Loader />}
      {data && (data.files.length || data.directories.length) && (
        <DirContent fs={data} />
      )}
    </>
  );
};

Homepage.getLayout = getMainLayout;

export default Homepage;
