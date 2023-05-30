<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $table = 'albums';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'album_title',
        'album_image',
        'published_date',
        'artist_email',
    ];

    /**
     * Get the user that owns the album.
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Get the songs for the album.
     */
    public function song()
    {
        return $this->hasMany(Song::class);
    }
}
