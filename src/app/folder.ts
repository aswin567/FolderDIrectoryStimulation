export interface Folder {
    folderName: string;
    url: string;
    subFolders: Array<Folder>;
}
