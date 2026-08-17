<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('blog_code', 50)->unique();
            $table->foreignId('category_id')->constrained('blog_categories')->restrictOnDelete();
            $table->string('title', 255);
            $table->string('slug', 300)->unique();
            $table->text('short_description')->nullable();
            $table->string('featured_image', 500)->nullable();
            $table->longText('content');
            $table->string('author_name', 150)->nullable();
            $table->string('seo_title', 255)->nullable();
            $table->string('seo_description', 500)->nullable();
            $table->enum('status', ['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED'])->default('DRAFT');
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->unsignedBigInteger('view_count')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('admin_users')->nullOnDelete();
            $table->timestamps();

            $table->index(['category_id', 'status']);
            $table->index('published_at');
            $table->index('created_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
