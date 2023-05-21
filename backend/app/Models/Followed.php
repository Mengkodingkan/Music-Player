<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Followed extends Model
{
    use HasFactory;

    protected $table = 'followed';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'artist_id',
        'user_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function artist()
    {
        return $this->belongsTo(User::class, 'artist_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}