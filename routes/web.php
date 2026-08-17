<?php

use App\Http\Controllers\Admin\AuthenticatedSessionController as AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminAuthenticatedSessionController::class, 'create'])->name('home');
Route::post('/', [AdminAuthenticatedSessionController::class, 'store'])->name('admin.login.store');

Route::middleware('auth:admin')->group(function () {
    Route::get('admin/dashboard', AdminDashboardController::class)->name('admin.dashboard');
    Route::post('admin/logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('admin.logout');
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
