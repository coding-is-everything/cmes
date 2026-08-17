<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discussion_id')->constrained('community_discussions')->cascadeOnDelete();
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->restrictOnDelete();
            $table->foreignId('parent_reply_id')->nullable()->constrained('community_replies')->cascadeOnDelete();
            $table->text('content');
            $table->enum('status', ['PUBLISHED', 'HIDDEN', 'DELETED'])->default('PUBLISHED');
            $table->unsignedInteger('like_count')->default(0);
            $table->timestamps();

            $table->index(['discussion_id', 'status']);
            $table->index(['customer_account_id', 'created_at']);
            $table->index('parent_reply_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_replies');
    }
};
