<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $table = 'songs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'song_title',
        'url',
        'duration',
        'status',
        'release_date',
        'album_id',
    ];

    /**
     * Get the album that owns the song.
     */
    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
