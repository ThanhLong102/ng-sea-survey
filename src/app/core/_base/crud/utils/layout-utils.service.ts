// Angular
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Partials for CRUD
import {
  ActionNotificationComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent, NotificationDialogComponent,
  UpdateStatusDialogComponent, ImageDialogComponent,
} from '../../../../views/partials/content/crud/';
import { Observable, throwError } from 'rxjs';
import { map } from 'lodash';
import { catchError } from 'rxjs/operators';
export enum MessageType {
  Create,
  Read,
  Update,
  Delete
}

@Injectable()
export class LayoutUtilsService {
  typeBar;
  style;
  /**
   * Service constructor
   *
   * @param snackBar: MatSnackBar
   * @param dialog: MatDialog
   */
  obj;
  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private http: HttpClient) {
  }

  /**
   * Showing (Mat-Snackbar) Notification
   *
   * @param message: string
   * @param type: MessageType
   * @param duration: number
   * @param showCloseButton: boolean
   * @param showUndoButton: boolean
   * @param undoButtonDuration: number
   * @param verticalPosition: 'bottom' | 'right' = 'right'
   */
  showActionNotification(
    message: string,
    snackbarType,
    type: MessageType = MessageType.Create,
    duration: number = 5000,
    showCloseButton: boolean = true,
    showUndoButton: boolean = true,
    undoButtonDuration: number = 3000,
  ) {

    this.getTypeBar(snackbarType);
    const data = {
      message,
      snackBar: this.snackBar,
      showCloseButton,
      showUndoButton,
      undoButtonDuration,
      type,
      snackbarType,
      color: this.style,

      /*action: 'Undo'*/
    };
    return this.snackBar.openFromComponent(ActionNotificationComponent, {
      duration,
      data,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: [this.typeBar]

    });
  }


  /**
   * Showing Confirmation (Mat-Dialog) before Entity Removing
   *
   * @param title: string
   * @param description: string
   * @param waitDescription: string
   */
  deleteElement(title: string = '', description: string = '', waitDescription: string = '') {
    return this.dialog.open(DeleteEntityDialogComponent, {
      data: {title, description, waitDescription},
      width: '30%',
    });
  }
  /**
   * Showing Fetching Window(Mat-Dialog)
   *
   * @param data: any
   */
  fetchElements(data) {
    return this.dialog.open(FetchEntityDialogComponent, {
      data,
      width: '600px'
    });
  }

  /**
   * Showing Update Status for Entities Window
   *
   * @param title: string
   * @param statuses: string[]
   * @param messages: string[]
   */
  updateStatusForEntities(title, statuses, messages) {
    return this.dialog.open(UpdateStatusDialogComponent, {
      data: {title, statuses, messages},
      width: '600px'
    });
  }

  notification(title: string = '', description: string = '', waitDescription: string = '') {
    return this.dialog.open(NotificationDialogComponent, {
      data: {title, description, waitDescription},
      width: '440px'
    });
  }

  showImage(image) {
    return this.dialog.open(ImageDialogComponent, {
      data: image,
    });
  }

  getTypeBar(e){
    if(e == "success"){
      this.typeBar = "success-noti-bar";
      this.style = "#155724";
    }
    if(e == "fail"){
      this.typeBar = "fail-noti-bar";
      this.style = "#721c24";

    }
    if(e == "warning"){
      this.typeBar ="warning-noti-bar";
      this.style = "#856404";
    }
  }

  pagingLabel(paging){
    const paginatorIntl = paging;
    paginatorIntl.nextPageLabel = 'Trang sau';
    paginatorIntl.previousPageLabel = 'Trang trước';
    paginatorIntl.firstPageLabel = 'Trang đầu';
    paginatorIntl.lastPageLabel = 'Trang cuối';
    paginatorIntl.itemsPerPageLabel = 'Số item một trang';
  }
}
