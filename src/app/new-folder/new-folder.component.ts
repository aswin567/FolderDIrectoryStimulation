import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Folder } from '../folder';
import { element } from 'protractor';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  newFolderName = '';
  constructor(public dialogRef: MatDialogRef<NewFolderComponent>, private snacksBar: MatSnackBar) {
  }

  ngOnInit() {
  }
  cancel() {
    this.newFolderName = '';
    this.dialogRef.close();
  }
  submit() {
    if (this.newFolderName && this.newFolderName.length !== 0) {
      this.dialogRef.close(this.newFolderName);
    } else {
      this.snacksBar.open('Folder Name cannot be empty', 'Ok', {
        duration: 5000
      });
    }
  }


}
