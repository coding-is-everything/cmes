<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_discussion_likes', function (Blueprint $table) {
            $table->foreignId('discussion_id')->constrained('community_discussions')->cascadeOnDelete();
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->primary(['discussion_id', 'customer_account_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_discussion_likes');
    }
};
