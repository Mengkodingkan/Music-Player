export class AlbumModel {
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

  private _image: string;

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  private _publishDate: string;

  get publishDate(): string {
    return this._publishDate;
  }

  set publishDate(value: string) {
    this._publishDate = value;
  }
}
