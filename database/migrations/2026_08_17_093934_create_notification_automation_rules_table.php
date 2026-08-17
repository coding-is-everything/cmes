<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_automation_rules', function (Blueprint $table) {
            $table->id();
            $table->string('rule_name', 150);
            $table->foreignId('notification_template_id')->constrained('notification_templates')->restrictOnDelete();
            $table->enum('trigger_type', ['LEASE_EXPIRY', 'RENEWAL_DUE', 'DOCUMENT_EXPIRY']);
            $table->integer('trigger_days_before')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_executed_at')->nullable();
            $table->timestamp('next_execution_at')->nullable();
            $table->timestamps();

            $table->index(['trigger_type', 'is_active']);
            $table->index('next_execution_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_automation_rules');
    }
};
