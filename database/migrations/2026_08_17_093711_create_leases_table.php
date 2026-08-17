<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->restrictOnDelete();
            $table->string('lease_number', 100)->unique();
            $table->date('lease_start_date');
            $table->date('lease_end_date');
            $table->decimal('lease_period_years', 8, 2)->nullable();
            $table->decimal('lease_area', 15, 4)->nullable();
            $table->string('lease_area_unit', 20)->default('HECTARE');
            $table->enum('lease_status', ['ACTIVE', 'EXPIRED', 'SUSPENDED', 'TRANSFERRED', 'CANCELLED'])->default('ACTIVE');
            $table->string('issuing_authority', 200)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'lease_status']);
            $table->index('lease_end_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leases');
    }
};
