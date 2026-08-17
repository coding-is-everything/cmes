<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('notification_template_id')->nullable()->constrained('notification_templates')->nullOnDelete();
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->cascadeOnDelete();
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->enum('scope', ['ACCOUNT', 'PROJECT']);
            $table->enum('notification_type', ['RENEWAL', 'DOCUMENT', 'COMPLIANCE', 'PROJECT_UPDATE', 'NEWS', 'BLOG', 'COMMUNITY', 'SYSTEM', 'OTHER']);
            $table->string('title', 255);
            $table->text('message');
            $table->enum('priority', ['LOW', 'NORMAL', 'HIGH', 'URGENT'])->default('NORMAL');
            $table->string('action_type', 50)->nullable();
            $table->string('action_reference', 100)->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->enum('status', ['DRAFT', 'SCHEDULED', 'SENT', 'FAILED'])->default('DRAFT');
            $table->timestamps();

            $table->index(['customer_account_id', 'status']);
            $table->index(['project_id', 'scope']);
            $table->index(['notification_type', 'created_at']);
            $table->index('scheduled_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
