<?php

namespace Database\Factories;

use App\Models\AdminUser;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<AdminUser>
 */
class AdminUserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admin_code' => strtoupper(Str::random(8)),
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'mobile_number' => fake()->numerify('##########'),
            'password_hash' => static::$password ??= Hash::make('password'),
            'status' => 'ACTIVE',
        ];
    }

    /**
     * Indicate that the admin account is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'INACTIVE',
        ]);
    }

    /**
     * Indicate that the admin account is locked.
     */
    public function locked(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'LOCKED',
        ]);
    }
}
