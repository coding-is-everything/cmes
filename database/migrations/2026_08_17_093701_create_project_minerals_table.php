<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_minerals', function (Blueprint $table) {
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('mineral_id')->constrained('minerals')->restrictOnDelete();
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            $table->primary(['project_id', 'mineral_id']);
            $table->index(['mineral_id', 'is_primary']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_minerals');
    }
};
