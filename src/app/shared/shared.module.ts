import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { HighlightDirective } from './directives/highlight.directive';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { RelativeDatePipe } from './pipes/relative-date.pipe';

@NgModule({
  declarations: [
    // Components
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    NotificationComponent,
    DataTableComponent,
    FilterBarComponent,
    
    // Directives
    ClickOutsideDirective,
    HighlightDirective,
    
    // Pipes
    TruncatePipe,
    SafeHtmlPipe,
    RelativeDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Components
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    NotificationComponent,
    DataTableComponent,
    FilterBarComponent,
    
    // Directives
    ClickOutsideDirective,
    HighlightDirective,
    
    // Pipes
    TruncatePipe,
    SafeHtmlPipe,
    RelativeDatePipe
  ]
})
export class SharedModule { }