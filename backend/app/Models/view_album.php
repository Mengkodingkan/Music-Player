<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class view_album extends Model
{
    use HasFactory;

    protected $table = 'view_album';

    protected $fillable = [
        'user_id',
        'album_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function song()
    {
        return $this->hasMany(Song::class);
    }
}