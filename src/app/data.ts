import { Folder } from './folder';

export class Data {
    private static data: Data = null;
    directory: Array<Folder>= [
        {
            folderName: 'root',
            url: '/',
            subFolders: []
        }
    ];

    public static getInstance(): Data {
        if (Data.data == null) {
            Data.data  = new Data(new SingletonRestrictor());
        }
        return Data.data ;
    }
    constructor(private _restrcitor: SingletonRestrictor) {
        if (_restrcitor === null) {
            throw new Error('Instance creation is restricted from outside!!!"');
        }
    }
}
class SingletonRestrictor {
    }
