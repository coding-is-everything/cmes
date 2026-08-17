<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('renewals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->restrictOnDelete();
            $table->foreignId('lease_id')->nullable()->constrained('leases')->nullOnDelete();
            $table->string('renewal_reference', 100)->unique();
            $table->date('current_expiry_date');
            $table->date('renewal_due_date');
            $table->date('application_date')->nullable();
            $table->date('submission_date')->nullable();
            $table->date('approval_date')->nullable();
            $table->enum('status', ['NOT_STARTED', 'UPCOMING', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED', 'EXPIRED'])->default('NOT_STARTED');
            $table->foreignId('assigned_admin_id')->nullable()->constrained('admin_users')->nullOnDelete();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'status']);
            $table->index('renewal_due_date');
            $table->index('assigned_admin_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('renewals');
    }
};
