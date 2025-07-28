import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification-container">
      <div 
        *ngFor="let notification of notifications" 
        class="notification"
        [ngClass]="'notification-' + notification.type"
        [@slideInOut]
      >
        <div class="notification-content">
          <span class="notification-icon">
            <i [class]="getIconClass(notification.type)"></i>
          </span>
          <span class="notification-message">{{ notification.message }}</span>
        </div>
        <button class="notification-close" (click)="removeNotification(notification.id)">
          &times;
        </button>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
    }
    
    .notification {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      margin-bottom: 10px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      color: white;
      min-width: 300px;
    }
    
    .notification-success {
      background: #28a745;
    }
    
    .notification-error {
      background: #dc3545;
    }
    
    .notification-warning {
      background: #ffc107;
      color: #212529;
    }
    
    .notification-info {
      background: #17a2b8;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      flex: 1;
    }
    
    .notification-icon {
      margin-right: 10px;
      font-size: 16px;
    }
    
    .notification-message {
      flex: 1;
    }
    
    .notification-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 18px;
      cursor: pointer;
      margin-left: 10px;
      opacity: 0.7;
    }
    
    .notification-close:hover {
      opacity: 1;
    }
  `],
  animations: [
    // Add animations here if needed
  ]
})
export class NotificationComponent {
  @Input() notifications: Notification[] = [];
  @Output() remove = new EventEmitter<string>();
  
  removeNotification(id: string) {
    this.remove.emit(id);
  }
  
  getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-info-circle';
    }
  }
} 