import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { GoCellFieldComponent } from "./go-cell-field/go-cell-field.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-go-cell',
    standalone: true,
    templateUrl: './go-cell.component.html',
    styleUrl: './go-cell.component.scss',
    imports: [GoCellFieldComponent, CommonModule]
})
export class GoCellComponent implements AfterViewInit {
  @Input() x!: number;
  @Input() y!: number;

  @Input() boardXSize!: number;
  @Input() boardYSize!: number;

  @ViewChild('goCell', { static: false }) goCell!: ElementRef;
  width = 0;
  height = 0;
  fieldWidth = 20;
  fieldHeight = 20;

  scale = 1/3;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.updateComponentSize();
  }
  ngAfterViewInit() {
    this.updateComponentSize();
  }

  updateComponentSize() {
    this.fieldWidth = this.goCell.nativeElement.getBoundingClientRect().width * this.scale
    this.fieldHeight = this.goCell.nativeElement.getBoundingClientRect().height * this.scale

    this.width = this.goCell.nativeElement.getBoundingClientRect().width - (this.fieldWidth/2 + 2); //  + border
    this.height = this.goCell.nativeElement.getBoundingClientRect().height - (this.fieldHeight/2 + 2);
    this.cdr.detectChanges();
  }
}
