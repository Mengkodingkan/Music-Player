<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $table = 'song';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'image',
        'audio',
        'duration',
        'release_date',
        'status',
        'genre_id',
        'album_id',
        'artist_id'
    ];

    /**
     * Get the genre that owns the song.
     */
    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    /**
     * Get the album that owns the song.
     */
    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    /**
     * Get the artist that owns the song.
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}