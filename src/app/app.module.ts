import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule, MatInputModule,
   MatDialogModule, MatFormFieldModule, MatSnackBarModule} from '@angular/material';
import 'hammerjs';
import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { NewFolderComponent } from './new-folder/new-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    NewFolderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  entryComponents: [
    NewFolderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
