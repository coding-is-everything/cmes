<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_discussions', function (Blueprint $table) {
            $table->id();
            $table->string('discussion_code', 50)->unique();
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->restrictOnDelete();
            $table->foreignId('category_id')->constrained('community_categories')->restrictOnDelete();
            $table->string('title', 255);
            $table->longText('content');
            $table->enum('status', ['PUBLISHED', 'PENDING', 'HIDDEN', 'LOCKED', 'ARCHIVED'])->default('PUBLISHED');
            $table->unsignedInteger('reply_count')->default(0);
            $table->unsignedInteger('like_count')->default(0);
            $table->timestamps();

            $table->index(['customer_account_id', 'status']);
            $table->index(['category_id', 'status']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_discussions');
    }
};
