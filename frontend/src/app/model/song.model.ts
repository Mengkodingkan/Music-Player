export class SongModel {
  private _id: any;

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _url: string;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  private _likeCount: number;

  get likeCount(): number {
    return this._likeCount;
  }

  set likeCount(value: number) {
    this._likeCount = value;
  }

  private _albumImage: string;

  get albumImage(): string {
    return this._albumImage;
  }

  set albumImage(value: string) {
    this._albumImage = value;
  }

  private _artistName: string;

  get artistName(): string {
    return this._artistName;
  }

  set artistName(value: string) {
    this._artistName = value;
  }

  private _albumId: any;

  get albumId(): any {
    return this._albumId;
  }

  set albumId(value: any) {
    this._albumId = value;
  }

  private _artistId: any;

  get artistId(): any {
    return this._artistId;
  }

  set artistId(value: any) {
    this._artistId = value;
  }

  private _playlistId: any;

  get playlistId(): any {
    return this._playlistId;
  }

  set playlistId(value: any) {
    this._playlistId = value;
  }

  private _userId: any;

  get userId(): any {
    return this._userId;
  }

  set userId(value: any) {
    this._userId = value;
  }

  private _releaseDate: string;

  get releaseDate(): string {
    return this._releaseDate;
  }

  set releaseDate(value: string) {
    this._releaseDate = value;
  }
}
