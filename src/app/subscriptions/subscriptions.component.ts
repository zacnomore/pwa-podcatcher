import { Component, OnInit } from '@angular/core';
import { IListItem } from '../shared/components/podcast-list/podcast-list.component';
import { SubscriptionsService } from './subscriptions.service';
import { Router } from '@angular/router';
import { IPodcast } from '../shared/podcast.model';

@Component({
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  private _subscriptions: IPodcast[] = [];
  private set subscriptions(value: IPodcast[]) {
    this._subscriptions = value;
    this.list = value.map(
      sub => ({
        title: sub.name,
        image: sub.thumbnail ? sub.thumbnail.small : undefined
      })
    );
  }
  public list: IListItem[] = [];
  public loaded = false;

  constructor(
    private subscriptionService: SubscriptionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().then(
      subs => {
        this.subscriptions = subs;
        this.loaded = true;
      }
    );
  }

  viewPodcast(index: number): void {
    this.router.navigate(['podcast', 'feed', this._subscriptions[index].key]);
  }
}
