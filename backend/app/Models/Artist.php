<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    protected $table = 'artist';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'instagram',
        'facebook',
        'twitter',
        'website',
        'image',
        'about',
    ];

    /**
     * Get the albums for the artist.
     */
    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    /**
     * Get the songs for the artist.
     */
    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    /**
     * Get the user who follows the artist.
     */
    public function followers()
    {
        return $this->hasManyThrough(User::class, Followed::class, 'artist_id', 'id', 'id', 'user_id');
    }
}