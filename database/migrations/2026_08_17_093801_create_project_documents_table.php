<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('document_type_id')->constrained('document_types')->restrictOnDelete();
            $table->string('document_name', 255);
            $table->string('document_number', 100)->nullable();
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('file_path', 500);
            $table->string('original_file_name', 255);
            $table->string('mime_type', 100)->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->unsignedInteger('version_number')->default(1);
            $table->enum('status', ['ACTIVE', 'EXPIRED', 'ARCHIVED'])->default('ACTIVE');
            $table->foreignId('uploaded_by')->nullable()->constrained('admin_users')->nullOnDelete();
            $table->timestamps();

            $table->index(['project_id', 'document_type_id']);
            $table->index(['expiry_date', 'status']);
            $table->index('uploaded_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_documents');
    }
};
