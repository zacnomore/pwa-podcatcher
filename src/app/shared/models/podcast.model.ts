import { IImageSet } from './image.model';
import { IStorable } from 'src/app/store/store.service';

export interface IPodcast extends IStorable {
  name: string;
  feedUrl: string;
  thumbnail?: IImageSet;
  author?: string;
  feed?: IPodcastFeed;
}

export interface IInitializedPodcast extends IPodcast {
  feed: IPodcastFeed;
}

export interface IPodcastFeed {
  defaultImage?: IImageSet;
  episodes: IPodcastEpisode[];
}

export interface IPodcastEpisode extends IStorable {
  title: string;
  audioUrl: string;
  publishDate?: Date;
  thumbnail?: IImageSet;
}
