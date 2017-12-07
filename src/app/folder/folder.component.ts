import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material';
import { NewFolderComponent } from '../new-folder/new-folder.component';
import { Data } from '../data';
import { Folder } from '../folder';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  directoryData: Data = Data.getInstance();
  folderData: Folder;
  url: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.goToUrl();
  }

  goToUrl(): void {
    if (!this.url) {
      this.url = '/';
    }
    this.getFolder(this.url, this.directoryData.directory);
  }

  getFolder(url: string, directory: Array<Folder>) {
    directory.forEach(element => {
       if (element.url === url) {
          this.folderData = element;
       } else if (element.subFolders.length !== 0) {
          this.getFolder(url, element.subFolders);
       } else {
        this.folderData = null;
       }
    });
  }
onNewFolderAdd() {
    const dialogRef: MatDialogRef<NewFolderComponent> = this.dialog.open(NewFolderComponent, {
      data: 'Hey',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.addFolder(result, this.url, this.directoryData.directory);
      }
    });
}

  addFolder(name: string, url: string, directory: Array<Folder>) {
    const newFolder: Folder = {
      folderName: name,
      url: '',
      subFolders: []
    };
    if (url !== '/' ) {
      newFolder.url = url + '/' + name;
    }else {
      newFolder.url = url + name;
    }
    directory.forEach(element => {
      if (element.url === url) {
         element.subFolders.push(newFolder);
     } else if (element.subFolders.length !== 0) {
         this.addFolder(name, url, element.subFolders);
      } else {
       alert('invalid Folder');
      }
   });
  }
}
