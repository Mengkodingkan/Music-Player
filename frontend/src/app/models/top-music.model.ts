export class TopMusicModel {
  constructor(
    public id: number,
    public title: string,
    public albumImage: string,
    public songUrl: string,
    public duration: number,
    // public artistName: number,
    // public artistId: number,
    // public release: string,
    // public like: number,
  ) {
  }
}
