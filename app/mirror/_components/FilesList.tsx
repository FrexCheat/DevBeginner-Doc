import { createElement } from 'react';
import { FaRegFile } from 'react-icons/fa';

import icons from './icons';
import ItemCard from './ItemCard';
import { DownloadableFile as FileData } from '../_libs/type';

interface FilesListProps {
  files: FileData[];
  onDownload: (id: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, onDownload }) => {
  return (
    <div className='grid w-[70%] grid-cols-[repeat(auto-fill,330px)] justify-center gap-4'>
      {files.map((file) => (
        <ItemCard key={file.id}>
          <div className='flex h-20 flex-row items-center gap-8'>
            {icons[file.name as keyof typeof icons] ? (
              createElement(icons[file.name as keyof typeof icons], { width: 64, height: 64 })
            ) : (
              <FaRegFile size={48} />
            )}
            <div className='flex flex-col justify-center'>
              <span className='text-lg font-semibold'>{file.name}</span>
              <span className='text-sm text-gray-500'>{file.version}</span>
              <span className='text-sm text-gray-500'>最后更新于 {file.last_updated}</span>
            </div>
          </div>
          <button className='mirror-btn' onClick={() => onDownload(file.id)}>
            下载
          </button>
        </ItemCard>
      ))}
    </div>
  );
};

export default FilesList;
