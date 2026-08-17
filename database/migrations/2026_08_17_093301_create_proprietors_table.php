<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proprietors', function (Blueprint $table) {
            $table->id();
            $table->string('proprietor_code', 30)->unique();
            $table->string('proprietor_name', 200);
            $table->enum('entity_type', ['INDIVIDUAL', 'PROPRIETORSHIP', 'PARTNERSHIP', 'PRIVATE_LIMITED', 'PUBLIC_LIMITED', 'LLP', 'TRUST', 'GOVERNMENT', 'OTHER'])->default('INDIVIDUAL');
            $table->string('contact_person', 150)->nullable();
            $table->string('mobile_country_code', 10)->nullable();
            $table->string('mobile_number', 20)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('district', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->string('registration_number', 100)->nullable();
            $table->string('pan_number', 20)->nullable();
            $table->string('gst_number', 30)->nullable();
            $table->enum('status', ['ACTIVE', 'INACTIVE'])->default('ACTIVE');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['proprietor_name', 'status']);
            $table->index('gst_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proprietors');
    }
};
