<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('permission_code', 100)->unique();
            $table->string('permission_name', 150);
            $table->string('module_name', 100);
            $table->timestamps();

            $table->index('module_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
