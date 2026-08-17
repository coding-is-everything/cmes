<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->cascadeOnDelete();
            $table->string('device_uuid', 255);
            $table->enum('platform', ['ANDROID', 'IOS', 'WEB']);
            $table->string('push_token', 500);
            $table->string('device_name', 150)->nullable();
            $table->string('app_version', 50)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamps();

            $table->unique(['customer_account_id', 'device_uuid']);
            $table->index(['push_token']);
            $table->index(['customer_account_id', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_devices');
    }
};
