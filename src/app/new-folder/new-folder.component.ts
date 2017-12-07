import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Folder } from '../folder';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  newFolderName = '';
  url: string;
  directory: Array<Folder>;
  constructor(public dialogRef: MatDialogRef<NewFolderComponent>, private snacksBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.url = data.url;
    this.directory = data.directory;
  }

  ngOnInit() {
  }
  cancel() {
    this.newFolderName = '';
    this.dialogRef.close();
  }
  submit() {
    if (this.newFolderName && this.newFolderName.length !== 0) {
      let newUrl;
      if (this.url === '/') {
        newUrl = this.url + this.newFolderName;
      } else {
        newUrl = this.url + '/' + this.newFolderName;
      }
      if (this.isDuplicatedName(newUrl)) {
        this.snacksBar.open('Duplicate Entry', 'Ok', {
          duration: 5000
        });
      } else {
        this.dialogRef.close(this.newFolderName);
      }
    } else {
      this.snacksBar.open('Folder Name cannot be empty', 'Ok', {
        duration: 5000
      });
    }
  }

  isDuplicatedName(newUrl: string, directory: Array<Folder> = this.directory) {
    let duplicate;
    for (let i = 0; i < directory.length; i++) {
      if (directory[i].url === newUrl) {
        duplicate = true;
        break;
      } else if (directory[i].subFolders.length !== 0) {
        this.isDuplicatedName(newUrl, directory[i].subFolders);
      } else {
        duplicate =  false;
      }
    }
    return duplicate;
  }

}
