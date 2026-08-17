<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('document_types', function (Blueprint $table) {
            $table->id();
            $table->string('document_type_code', 50)->unique();
            $table->string('document_type_name', 150)->unique();
            $table->enum('category', ['LEASE', 'MINING', 'COMPLIANCE', 'ENVIRONMENT', 'GOVERNMENT_APPROVAL', 'RENEWAL', 'OTHER']);
            $table->boolean('expiry_required')->default(false);
            $table->enum('status', ['ACTIVE', 'INACTIVE'])->default('ACTIVE');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_types');
    }
};
