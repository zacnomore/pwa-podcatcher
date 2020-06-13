import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IImage } from '../../models/image.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent {
  @Input() list?: IListItem[];
  @Input() editable?: boolean;
  @Output() clickItem = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();
  @Output() reorder = new EventEmitter<ReorderedItem>();

  public onClickItem(index: number): void {
    this.clickItem.emit(index);
  }

  public onDeleteItem(index: number): void {
    this.removeItem.emit(index);
  }

  public drop({previousIndex, currentIndex}: CdkDragDrop<IListItem[]>): void {
    this.reorder.emit({ previousIndex, currentIndex });
  }
}

export interface IListItem {
  title: string;
  image?: IImage;
  selected?: boolean;
}

export interface ReorderedItem {
  previousIndex: number;
  currentIndex: number;
}