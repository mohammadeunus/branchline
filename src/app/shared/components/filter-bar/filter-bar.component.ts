import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: FilterOption[];
  placeholder?: string;
}

@Component({
  selector: 'app-filter-bar',
  template: `
    <div class="filter-bar">
      <div class="filter-controls">
        <div 
          *ngFor="let filter of filters" 
          class="filter-item"
        >
          <label [for]="filter.key">{{ filter.label }}</label>
          
          <!-- Text Input -->
          <input 
            *ngIf="filter.type === 'text'"
            [id]="filter.key"
            type="text"
            [placeholder]="filter.placeholder || filter.label"
            [(ngModel)]="filterValues[filter.key]"
            (input)="onFilterChange()"
            class="filter-input"
          >
          
          <!-- Select Input -->
          <select 
            *ngIf="filter.type === 'select'"
            [id]="filter.key"
            [(ngModel)]="filterValues[filter.key]"
            (change)="onFilterChange()"
            class="filter-select"
          >
            <option value="">{{ filter.placeholder || 'Select...' }}</option>
            <option 
              *ngFor="let option of filter.options" 
              [value]="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          
          <!-- Date Input -->
          <input 
            *ngIf="filter.type === 'date'"
            [id]="filter.key"
            type="date"
            [(ngModel)]="filterValues[filter.key]"
            (change)="onFilterChange()"
            class="filter-input"
          >
          
          <!-- Number Input -->
          <input 
            *ngIf="filter.type === 'number'"
            [id]="filter.key"
            type="number"
            [placeholder]="filter.placeholder || filter.label"
            [(ngModel)]="filterValues[filter.key]"
            (input)="onFilterChange()"
            class="filter-input"
          >
        </div>
        
        <div class="filter-actions">
          <button 
            class="btn btn-secondary"
            (click)="clearFilters()"
            [disabled]="!hasActiveFilters()"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter-bar {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    
    .filter-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: end;
    }
    
    .filter-item {
      display: flex;
      flex-direction: column;
      min-width: 150px;
    }
    
    .filter-item label {
      font-size: 12px;
      font-weight: 500;
      color: #666;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    
    .filter-input,
    .filter-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      background: white;
    }
    
    .filter-input:focus,
    .filter-select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    .filter-actions {
      display: flex;
      align-items: end;
    }
    
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-secondary:disabled {
      background: #adb5bd;
      cursor: not-allowed;
    }
    
    .btn-secondary:hover:not(:disabled) {
      background: #5a6268;
    }
  `]
})
export class FilterBarComponent {
  @Input() filters: FilterConfig[] = [];
  @Output() filterChange = new EventEmitter<Record<string, any>>();
  
  filterValues: Record<string, any> = {};
  
  ngOnInit() {
    // Initialize filter values
    this.filters.forEach(filter => {
      this.filterValues[filter.key] = '';
    });
  }
  
  onFilterChange() {
    this.filterChange.emit(this.filterValues);
  }
  
  clearFilters() {
    this.filters.forEach(filter => {
      this.filterValues[filter.key] = '';
    });
    this.onFilterChange();
  }
  
  hasActiveFilters(): boolean {
    return Object.values(this.filterValues).some(value => 
      value !== '' && value !== null && value !== undefined
    );
  }
} 