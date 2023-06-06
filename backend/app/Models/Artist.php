<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Artist extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'artists';

    protected $fillable = [
        'full_name',
        'image',
        'bio',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    public function setPasswordAttribute($password): void
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function album(): HasMany
    {
        return $this->hasMany(Album::class, 'artist_id', 'id');
    }

    public function song(): HasMany
    {
        return $this->hasMany(Song::class, 'artist_id', 'id');
    }
}
