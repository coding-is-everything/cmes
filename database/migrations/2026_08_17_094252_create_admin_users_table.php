<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin_users', function (Blueprint $table) {
            $table->id();
            $table->string('admin_code', 30)->unique();
            $table->string('full_name', 150);
            $table->string('email', 150)->unique();
            $table->string('mobile_number', 20)->nullable();
            $table->string('password_hash', 255);
            $table->enum('status', ['ACTIVE', 'INACTIVE', 'LOCKED'])->default('ACTIVE');
            $table->timestamp('last_login_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'full_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_users');
    }
};
