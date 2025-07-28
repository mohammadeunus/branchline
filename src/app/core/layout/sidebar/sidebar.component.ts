import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'People', icon: '👥', route: '/people', active: true },
    { label: 'Hiring', icon: '🎯', route: '/hiring' },
    { label: 'Devices', icon: '💻', route: '/devices' },
    { label: 'Apps', icon: '📱', route: '/apps' },
    { label: 'Salary', icon: '💰', route: '/salary' },
    { label: 'Calendar', icon: '📅', route: '/calendar' },
    { label: 'Reviews', icon: '⭐', route: '/reviews' }
  ];

  constructor(private router: Router) {}

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}