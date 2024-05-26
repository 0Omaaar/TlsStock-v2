import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSource = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSource.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  addNotification(notification: Notification) {
    const currentNotifications = this.notificationsSource.getValue();
    this.notificationsSource.next([...currentNotifications, notification]);

    this.snackBar.open("Nouvelle Notification !", 'Fermer', {
      panelClass: 'blue-action', 
      duration: 5000, 
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  removeNotification(id: number) {
    const currentNotifications = this.notificationsSource.getValue();
    this.notificationsSource.next(currentNotifications.filter(notif => notif.id !== id));
  }

  clearAllNotifications(){
    this.notificationsSource.next([]);
  }

}
