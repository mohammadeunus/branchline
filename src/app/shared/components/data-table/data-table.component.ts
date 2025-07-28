import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'date' | 'number' | 'badge' | 'avatar';
}

export interface TableAction {
  label: string;
  icon?: string;
  action: (item: any) => void;
  visible?: (item: any) => boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() selectable = false;
  
  @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
  @Output() selectionChange = new EventEmitter<any[]>();

  selectedItems: any[] = [];
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sort.emit({ column: column.key, direction: this.sortDirection });
  }

  onSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedItems = [...this.data];
    } else {
      this.selectedItems = [];
    }
    this.selectionChange.emit(this.selectedItems);
  }

  onSelectItem(item: any, event: any): void {
    if (event.target.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(selected => selected !== item);
    }
    this.selectionChange.emit(this.selectedItems);
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedItems.length === this.data.length;
  }

  isIndeterminate(): boolean {
    return this.selectedItems.length > 0 && this.selectedItems.length < this.data.length;
  }

  getCellValue(item: any, column: TableColumn): any {
    return item[column.key];
  }

  executeAction(action: TableAction, item: any): void {
    action.action(item);
  }

  isActionVisible(action: TableAction, item: any): boolean {
    return action.visible ? action.visible(item) : true;
  }
}