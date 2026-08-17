<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_saved_news', function (Blueprint $table) {
            $table->foreignId('customer_account_id')->constrained('customer_accounts')->cascadeOnDelete();
            $table->foreignId('news_id')->constrained('news')->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->primary(['customer_account_id', 'news_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_saved_news');
    }
};
