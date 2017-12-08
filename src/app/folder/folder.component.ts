import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
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
  height: string;
  containerHeight: string;
  marginTop: string;
  folderUrlList: Array<string> = [];
  constructor(private dialog: MatDialog, private snacksBar: MatSnackBar) { }

  ngOnInit() {
    this.folderUrlList.push('/');
    this.goToUrl();
    this.onHeightSet();
  }
  onHeightSet() {
    const windowHeight = window.innerHeight;
    this.height = Number(windowHeight - 20) + 'px';
    this.marginTop = '-' + Number((windowHeight - 20) / 2) + 'px';
    this.containerHeight = Number(windowHeight - (20 + 64)) + 'px';
  }
  goToUrl(): void {
    if (!this.url) {
      this.url = '/';
    }
    if (this.isValidUrl) {
      this.getFolder(this.url);
    } else {
      this.snacksBar.open('Invalid Folder', 'Ok', {
        duration: 5000
      });
    }
  }

  getFolder(url: string, directory: Array<Folder> = this.directoryData.directory) {
    let isInvalid: boolean;
    for (let i = 0; i < directory.length; i++) {
      isInvalid = false;
      if (directory[i].url === url) {
        this.folderData = directory[i];
        break;
      } else if (directory[i].subFolders.length !== 0) {
        this.getFolder(url, directory[i].subFolders);
      } else {
        isInvalid = true;
      }
    }
  }
  onNewFolderAdd() {
    const injectData = {
      directory: this.directoryData.directory,
      url: this.url
    };
    const dialogRef: MatDialogRef<NewFolderComponent> = this.dialog.open(NewFolderComponent, {
      data: injectData,
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
    if (url !== '/') {
      newFolder.url = url + '/' + name;
    } else {
      newFolder.url = url + name;
    }
    this.folderUrlList.push(newFolder.url);
    let isInvalid: boolean;
    directory.forEach(element => {
      isInvalid = false;
      if (element.url === url) {
        element.subFolders.push(newFolder);
      } else if (element.subFolders.length !== 0) {
        this.addFolder(name, url, element.subFolders);
      } else {
        isInvalid = true;
      }
    });
    // if (isInvalid) {
    //   this.snacksBar.open('Invalid Folder', 'Ok', {
    //     duration: 5000
    //   });
    // }
  }

  goBack() {
    const urlArray = this.url.split('/');
    const delIndex = urlArray.length - 1;
    urlArray.splice(delIndex, 1);
    this.url = urlArray.join('/');
    if (this.url === '') {
      this.url = '/';
    }
    if (this.isValidUrl) {
      this.getFolder(this.url);
    } else {
      this.snacksBar.open('Invalid Folder', 'Ok', {
        duration: 5000
      });
    }
  }

  openFolder(folderName: string) {
    if (this.url === '/') {
      this.url = this.url + folderName;
    } else {
      this.url = this.url + '/' + folderName;
    }
    if (this.isValidUrl) {
      this.getFolder(this.url);
    } else {
      this.snacksBar.open('Invalid Folder', 'Ok', {
        duration: 5000
      });
    }
  }
  isValidUrl(url: string = this.url) {
    const isValid = this.folderUrlList.some((folderUrl) => {
      return folderUrl === url;
    });
    return isValid;
  }
}
