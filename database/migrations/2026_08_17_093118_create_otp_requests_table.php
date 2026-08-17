<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_otp_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_account_id')->nullable()->constrained('customer_accounts')->nullOnDelete();
            $table->enum('verification_type', ['MOBILE', 'EMAIL']);
            $table->string('destination', 255);
            $table->string('otp_hash', 255);
            $table->timestamp('expires_at');
            $table->timestamp('verified_at')->nullable();
            $table->unsignedInteger('attempts')->default(0);
            $table->enum('status', ['PENDING', 'VERIFIED', 'EXPIRED', 'FAILED', 'BLOCKED'])->default('PENDING');
            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();

            $table->index(['destination', 'status']);
            $table->index('expires_at');
            $table->index(['customer_account_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_otp_requests');
    }
};
