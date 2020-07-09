import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPodcastEpisode } from '../shared/models/podcast.model';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private store: StoreService) {}

  public downloadEpisode(episode: IPodcastEpisode): Observable<IDownloadReport> {
    const progressReporter = new Subject<IDownloadReport>();
    const downloader = this.buildDownloader(episode.audioUrl);
    this.download(downloader, progressReporter).then(audio => {
      this.store.setEpisode({...episode, audio});
      progressReporter.next(new DownloadProgress(1, 1, true));
    }).catch(fail => {
      progressReporter.next({
        reason: 'cors',
        failure: true
      });
    });
    return progressReporter.asObservable();
  }

  private async download(
    downloader: AsyncGenerator<DownloadProgress | Blob>,
    sub: Subject<IDownloadReport>
  ): Promise<Blob | undefined> {
    for await(const progress of downloader) {
      if(progress instanceof DownloadProgress) {
        sub.next(progress);
      } else {
        return progress;
      }
    }
  }

  private async* buildDownloader(url: string): AsyncGenerator<DownloadProgress | Blob> {
    const response = await fetch(url);

    if(response.body) {
      const contentLength: string = response.headers.get('Content-Length') || String(Number.MAX_SAFE_INTEGER);
      const total = Number.parseInt(contentLength, 10);
      const iterableReader = this.buildIterableReader<Uint8Array>(response.body.getReader());
      let receivedLength = 0;
      const chunks: Uint8Array[] = [];

      for await (const {value} of iterableReader) {
        if(value !== undefined) {
          chunks.push(value);
          receivedLength += value.length;
          yield new DownloadProgress(receivedLength, total);
        }
      }

      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for(const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }
      yield new Blob([chunksAll]);

    }
  }

  private async* buildIterableReader<T>(reader: ReadableStreamDefaultReader<T>): AsyncGenerator<ReadableStreamReadResult<T>> {
    let finished = false;
    while(!finished) {
      const red = await reader.read();
      finished = red.done;
      yield red;
    }
  }
}


export class DownloadProgress {
  constructor(public received?: number, public total?: number, public complete?: boolean) {}
  failure = false;
  public get progress(): number {
    return ((this.received || 0) / (this.total || Number.MAX_SAFE_INTEGER)) * 100;
  }
}
export interface IDownloadFailure {
  failure: true;
  reason: string;
}

export type IDownloadReport = DownloadProgress | IDownloadFailure;