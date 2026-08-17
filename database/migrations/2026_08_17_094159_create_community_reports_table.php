<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discussion_id')->nullable()->constrained('community_discussions')->cascadeOnDelete();
            $table->foreignId('reply_id')->nullable()->constrained('community_replies')->cascadeOnDelete();
            $table->foreignId('reported_by_customer_id')->constrained('customer_accounts')->restrictOnDelete();
            $table->enum('reason', ['SPAM', 'OFFENSIVE', 'MISLEADING', 'HARASSMENT', 'IRRELEVANT', 'OTHER']);
            $table->text('description')->nullable();
            $table->enum('status', ['PENDING', 'REVIEWED', 'DISMISSED', 'ACTION_TAKEN'])->default('PENDING');
            $table->foreignId('reviewed_by')->nullable()->constrained('admin_users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('reported_by_customer_id');
            $table->index('reviewed_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_reports');
    }
};
