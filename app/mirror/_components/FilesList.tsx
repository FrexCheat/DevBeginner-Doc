import Image from 'next/image';
import { FaRegFile } from 'react-icons/fa';

import ItemCard from './ItemCard';
import icons from '../_libs/icon';
import { DownloadableFile as FileData } from '../_libs/type';

interface FilesListProps {
  files: FileData[];
  onDownload: (id: string) => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, onDownload }) => {
  return (
    <div className='w-full grid grid-cols-[repeat(auto-fill,330px)] gap-4 justify-center'>
      {files.map((file) => (
        <ItemCard key={file.id}>
          <div className='flex flex-row gap-8 h-20 items-center'>
            {icons[file.name as keyof typeof icons] ? (
              <Image
                src={icons[file.name as keyof typeof icons]}
                alt={file.name}
                width={64}
                height={64}
              />
            ) : (
              <FaRegFile size={48} />
            )}
            <div className='flex flex-col justify-center'>
              <span className='text-lg font-semibold'>{file.name}</span>
              <span className='text-sm text-gray-500'>{file.version}</span>
              <span className='text-sm text-gray-500'>
                最后更新于 {file.last_updated}
              </span>
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
