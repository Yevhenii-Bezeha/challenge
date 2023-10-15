import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'paginator',
    standalone: true,
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatPaginatorModule]
})
export class PaginatorComponent {
  @Input({ required: true }) length: number = 0;
  @Input({ required: true }) pageSize: number = 0;
  @Input({ required: true }) pageIndex: number = 0;
  @Input() paginatorDisabled: boolean = false;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  pageSizeOptions: number[] = [10, 30, 50];

  handlePageEvent(e: PageEvent) {
      this.pageEvent.emit(e);
  }
}
