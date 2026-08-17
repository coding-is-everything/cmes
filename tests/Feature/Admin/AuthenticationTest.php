<?php

namespace Tests\Feature\Admin;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_login_screen_can_be_rendered()
    {
        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('admin/login'));
    }

    public function test_admins_can_authenticate_using_the_login_screen()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated('admin');
        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_successful_login_flashes_a_success_toast()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $response->assertSessionHas('inertia.flash_data', [
            'toast' => [
                'type' => 'success',
                'message' => 'Login successful. Welcome back!',
                'position' => 'bottom-center',
            ],
        ]);
    }

    public function test_admins_can_authenticate_with_remember_me_checked()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
            'remember' => 'on',
        ]);

        $this->assertAuthenticated('admin');
        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_authenticating_updates_the_last_login_timestamp()
    {
        $admin = AdminUser::factory()->create(['last_login_at' => null]);

        $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertNotNull($admin->fresh()->last_login_at);
    }

    public function test_admins_can_not_authenticate_with_invalid_password()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest('admin');
        $response->assertSessionHasErrors('email');
    }

    public function test_inactive_admins_can_not_authenticate()
    {
        $admin = AdminUser::factory()->inactive()->create();

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertGuest('admin');
        $response->assertSessionHasErrors('email');
    }

    public function test_locked_admins_can_not_authenticate()
    {
        $admin = AdminUser::factory()->locked()->create();

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertGuest('admin');
        $response->assertSessionHasErrors('email');
    }

    public function test_authenticated_admins_are_redirected_from_login_to_dashboard()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->actingAs($admin, 'admin')->get(route('home'));

        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_admins_can_logout()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->actingAs($admin, 'admin')->post(route('admin.logout'));

        $this->assertGuest('admin');
        $response->assertRedirect(route('home'));
    }

    public function test_admins_are_rate_limited_after_too_many_failed_attempts()
    {
        $admin = AdminUser::factory()->create();

        for ($i = 0; $i < 5; $i++) {
            $this->post(route('admin.login.store'), [
                'email' => $admin->email,
                'password' => 'wrong-password',
            ]);
        }

        $response = $this->post(route('admin.login.store'), [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertGuest('admin');
        $response->assertSessionHasErrors('email');
    }
}
