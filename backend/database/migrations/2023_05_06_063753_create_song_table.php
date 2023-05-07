<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('song', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->time('duration');
            $table->date('release_date');
            $table->enum('status', ['pending', 'published', 'rejected']);
            $table->unsignedBigInteger('artist_id');
            $table->unsignedBigInteger('album_id');
            $table->unsignedBigInteger('genre_id');
            $table->foreign('artist_id')->references('id')->on('artist');
            $table->foreign('album_id')->references('id')->on('album');
            $table->foreign('genre_id')->references('id')->on('genre');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('song');
    }
}