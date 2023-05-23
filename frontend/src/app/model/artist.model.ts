export class ArtistModel {
  private _id: any;

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = value;
  }

  private _image: string;

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _bio: string;

  get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
  }

  private _igUrl: any;

  get igUrl(): any {
    return this._igUrl;
  }

  set igUrl(value: any) {
    this._igUrl = value;
  }

  private _fbUrl: any;

  get fbUrl(): any {
    return this._fbUrl;
  }

  set fbUrl(value: any) {
    this._fbUrl = value;
  }

  private _webUrl: any;

  get webUrl(): any {
    return this._webUrl;
  }

  set webUrl(value: any) {
    this._webUrl = value;
  }
}
