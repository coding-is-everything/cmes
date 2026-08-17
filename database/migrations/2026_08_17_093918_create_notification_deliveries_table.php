<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_deliveries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('notification_id')->constrained('notifications')->cascadeOnDelete();
            $table->foreignId('customer_device_id')->constrained('customer_devices')->cascadeOnDelete();
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('opened_at')->nullable();
            $table->enum('status', ['PENDING', 'SENT', 'DELIVERED', 'OPENED', 'FAILED'])->default('PENDING');
            $table->string('failure_reason', 500)->nullable();
            $table->timestamps();

            $table->index(['notification_id', 'status']);
            $table->index(['customer_device_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_deliveries');
    }
};
