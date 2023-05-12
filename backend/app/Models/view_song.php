<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class view_song extends Model
{
    use HasFactory;

    protected $table = 'view_song';

    protected $fillable = [
        'user_id',
        'song_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function song()
    {
        return $this->belongsTo(Song::class);
    }

    public function album()
    {
        return $this->hasMany(Album::class);
    }
}