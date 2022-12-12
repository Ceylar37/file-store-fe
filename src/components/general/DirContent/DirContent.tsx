import { baseApiUrl } from '@constants/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DocumentIcon from 'public/icons/document.svg';
import FolderIcon from 'public/icons/folder.svg';
import React, { FC } from 'react';

import { Fs } from '@store/reducers/fs/types';

interface DirContentProps {
  fs: Fs;
}

const DirContent: FC<DirContentProps> = props => {
  const { fs } = props;

  return (
    <div className='p-5'>
      <div className='flex flex-wrap my-2 gap-3'>
        {fs.directories.map(dir => (
          <div className='flex items-center gap-2 bg-blue-200 hover:bg-blue-300 transition-colors duration-200 p-2 rounded text-xl cursor-pointer'>
            <FolderIcon width={20} height={20} />
            {dir.name}
          </div>
        ))}
      </div>
      {fs.directories.length && fs.files.length && <hr />}
      <div className='flex flex-wrap my-2 gap-3'>
        {fs.files.map(file => (
          <a
            key={file.id}
            download
            href={`${baseApiUrl}/files/read/${localStorage.getItem('token')}/${
              file.id
            }/${file.name}`}
          >
            <div className='flex items-center gap-2 bg-purple-200 hover:bg-purple-300 transition-colors duration-200 p-2 rounded text-xl cursor-pointer'>
              <DocumentIcon width={20} height={20} />
              {file.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DirContent;
