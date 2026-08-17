<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_code', 50)->unique();
            $table->string('project_name', 200);
            $table->string('khadan_name', 200)->nullable();
            $table->enum('project_type', ['MINE', 'QUARRY', 'MINING_LEASE', 'OTHER'])->default('MINE');
            $table->enum('project_status', ['DRAFT', 'ACTIVE', 'UNDER_PROCESS', 'SUSPENDED', 'EXPIRED', 'CLOSED'])->default('DRAFT');
            $table->text('description')->nullable();
            $table->date('established_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['project_name', 'project_status']);
            $table->index(['project_type', 'project_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
