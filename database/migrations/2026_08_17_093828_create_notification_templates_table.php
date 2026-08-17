<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_templates', function (Blueprint $table) {
            $table->id();
            $table->string('template_code', 50)->unique();
            $table->string('template_name', 150);
            $table->enum('notification_type', ['RENEWAL', 'DOCUMENT', 'COMPLIANCE', 'PROJECT_UPDATE', 'NEWS', 'BLOG', 'COMMUNITY', 'SYSTEM', 'OTHER']);
            $table->string('title_template', 255);
            $table->text('message_template');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['notification_type', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_templates');
    }
};
