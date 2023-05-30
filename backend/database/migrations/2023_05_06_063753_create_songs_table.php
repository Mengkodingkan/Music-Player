<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('song_title');
            $table->string('url');
            $table->integer('duration');
            $table->enum('status', ['pending', 'rejected', 'published'])->default('pending');
            $table->date('release_date');
            $table->unsignedBigInteger('album_id');
            $table->foreign('album_id')->references('id')->on('albums')
                ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
    }
}
