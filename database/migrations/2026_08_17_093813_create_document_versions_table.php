<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('document_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_document_id')->constrained('project_documents')->cascadeOnDelete();
            $table->unsignedInteger('version_number');
            $table->string('file_path', 500);
            $table->string('original_file_name', 255);
            $table->string('mime_type', 100)->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('admin_users')->nullOnDelete();
            $table->timestamps();

            $table->unique(['project_document_id', 'version_number']);
            $table->index('uploaded_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_versions');
    }
};
