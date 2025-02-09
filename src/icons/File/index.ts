import note from './Note.svg';
import noteSearch from './Note_Search.svg';
import noteEdit from './Note_Edit.svg';
import notebook from './Notebook.svg';
import folderUpload from './Folder_Upload.svg';
import folder from './Folder.svg';
import folders from './Folders.svg';
import folderSearch from './Folder_Search.svg';
import folderRemove from './Folder_Remove.svg';
import folderOpen from './Folder_Open.svg';
import folderEdit from './Folder_Edit.svg';
import folderDownload from './Folder_Download.svg';
import folderDocument from './Folder_Document.svg';
import folderCode from './Folder_Code.svg';
import folderClose from './Folder_Close.svg';
import folderCheck from './Folder_Check.svg';
import folderAdd from './Folder_Add.svg';
import upload from './File_Upload.svg';
import files from './Files.svg';
import search from './File_Search.svg';
import remove from './File_Remove.svg';
import edit from './File_Edit.svg';
import download from './File_Download.svg';
import document from './File_Document.svg';
import code from './File_Code.svg';
import close from './File_Close.svg';
import check from './File_Check.svg';
import blank from './File_Blank.svg';
import add from './File_Add.svg';
import downloadPackage from './Download_Package.svg';
import cloudUpload from './Cloud_Upload.svg';
import cloud from './Cloud.svg';
import cloudRemove from './Cloud_Remove.svg';
import cloudOff from './Cloud_Off.svg';
import cloudDownload from './Cloud_Download.svg';
import cloudClose from './Cloud_Close.svg';
import cloudCheck from './Cloud_Check.svg';
import cloudAdd from './Cloud_Add.svg';
import archive from './Archive.svg';
const vals = {
archive,
cloudAdd,
cloudCheck,
cloudClose,
cloudDownload,
cloudOff,
cloudRemove,
cloud,
cloudUpload,
downloadPackage,
add,
blank,
check,
close,
code,
document,
download,
edit,
remove,
search,
files,
upload,
folderAdd,
folderCheck,
folderClose,
folderCode,
folderDocument,
folderDownload,
folderEdit,
folderOpen,
folderRemove,
folderSearch,
folders,
folder,
folderUpload,
notebook,
noteEdit,
noteSearch,
note,
} as const

export default vals as SVGObject<typeof vals>
