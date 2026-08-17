<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->restrictOnDelete();
            $table->foreignId('lease_id')->nullable()->constrained('leases')->nullOnDelete();
            $table->string('transfer_reference', 100)->unique();
            $table->foreignId('from_proprietor_id')->nullable()->constrained('proprietors')->nullOnDelete();
            $table->foreignId('to_proprietor_id')->nullable()->constrained('proprietors')->nullOnDelete();
            $table->foreignId('from_customer_account_id')->nullable()->constrained('customer_accounts')->nullOnDelete();
            $table->foreignId('to_customer_account_id')->nullable()->constrained('customer_accounts')->nullOnDelete();
            $table->enum('transfer_type', ['PROJECT_TRANSFER', 'LEASE_TRANSFER', 'OWNERSHIP_TRANSFER', 'OTHER']);
            $table->date('transfer_date');
            $table->date('remaining_lease_start_date')->nullable();
            $table->date('remaining_lease_end_date')->nullable();
            $table->text('transfer_reason')->nullable();
            $table->enum('transfer_status', ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED'])->default('DRAFT');
            $table->foreignId('approved_by')->nullable()->constrained('admin_users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'transfer_status']);
            $table->index(['transfer_date']);
            $table->index(['from_proprietor_id', 'to_proprietor_id']);
            $table->index(['from_customer_account_id', 'to_customer_account_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_transfers');
    }
};
