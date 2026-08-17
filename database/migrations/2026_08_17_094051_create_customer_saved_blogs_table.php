<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_saved_blogs', function (Blueprint $table) {
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->cascadeOnDelete();
            $table->foreignId('blog_id')->constrained('blogs')->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->primary(['customer_account_id', 'blog_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_saved_blogs');
    }
};
