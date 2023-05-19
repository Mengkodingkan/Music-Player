export class SongModel {
  constructor(
    public id: any,
    public songTitle: string,
    public songUrl: string,
    public duration: number,
    public releaseDate: string,
    public idAlbumId: any,
    public idPlaylistId?: any,
  ) {
  }
}
