<?php

namespace Tests\Feature\Admin;

use App\Models\AdminUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_admins_can_view_the_dashboard()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->actingAs($admin, 'admin')->get(route('admin.dashboard'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/dashboard')
            ->where('admin.email', $admin->email)
            ->where('admin.full_name', $admin->full_name)
            ->where('admin.admin_code', $admin->admin_code),
        );
    }

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('admin.dashboard'));

        $response->assertRedirect(route('home'));
    }

    public function test_admin_sidebar_open_defaults_to_true()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->actingAs($admin, 'admin')->get(route('admin.dashboard'));

        $response->assertInertia(fn (Assert $page) => $page->where('adminSidebarOpen', true));
    }

    public function test_admin_sidebar_open_reflects_the_admin_sidebar_state_cookie()
    {
        $admin = AdminUser::factory()->create();

        $response = $this->actingAs($admin, 'admin')
            ->withCookie('admin_sidebar_state', 'false')
            ->get(route('admin.dashboard'));

        $response->assertInertia(fn (Assert $page) => $page->where('adminSidebarOpen', false));
    }
}
