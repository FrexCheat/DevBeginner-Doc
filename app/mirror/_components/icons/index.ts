import IdeaIcon from './idea';
import PycharmIcon from './pycharm';
import VscodeIcon from './vscode';
import DevCppIcon from './devcpp';
import EmbDevCppIcon from './emb-devcpp';
import PandaCppIcon from './red-panda';
import CodeblocksIcon from './codeblocks';
import PythonIcon from './python';
import MsysIcon from './msys';

export const icons: Record<string, React.ComponentType> = {
  'IntellJ IDEA Ultimate': IdeaIcon,
  'PyCharm Ultimate': PycharmIcon,
  'PyCharm Community': PycharmIcon,
  'Visual Studio Code': VscodeIcon,
  'Dev C++ Orwell': DevCppIcon,
  'Dev C++ Embarcadero': EmbDevCppIcon,
  '小熊猫 Dev C++': PandaCppIcon,
  'Code::Blocks': CodeblocksIcon,
  'MSYS2': MsysIcon,
  'Python': PythonIcon,
};

export default icons;
