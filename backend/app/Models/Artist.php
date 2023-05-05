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
        'created_at',
        'updated_at',
        'user_id'
    ];

    /**
     * Get the user that owns the artist.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}