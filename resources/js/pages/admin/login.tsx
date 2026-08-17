import { Form, Head } from '@inertiajs/react';
import { ArrowRight, Mail, Mountain, ShieldCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import login from '@/routes/admin/login';

type Props = {
    status?: string;
};

export default function AdminLogin({ status }: Props) {
    return (
        <>
            <Head title="Admin Login" />

            <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-4">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
                    style={{
                        backgroundImage:
                            'radial-gradient(ellipse at top right, var(--color-foreground), transparent 60%)',
                    }}
                />

                <main className="relative z-10 flex w-full max-w-[440px] flex-col gap-8 rounded-lg border bg-card p-8 shadow-sm">
                    <header className="flex flex-col items-center gap-4 text-center">
                        <div className="flex size-16 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                            <Mountain className="size-8" />
                        </div>
                        <div>
                            <h1 className="mb-2 text-2xl font-semibold text-foreground">
                                CMES Mining
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Mining Management System — Administration
                                Portal
                            </p>
                        </div>
                    </header>

                    <Form
                        {...login.store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="email">
                                            Email Address
                                        </Label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="admin@cmes.com"
                                                className="pl-10"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <span className="cursor-not-allowed text-xs text-muted-foreground opacity-60">
                                                Forgot Password?
                                            </span>
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                        />
                                        <InputError
                                            message={errors.password}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="font-normal text-muted-foreground"
                                        >
                                            Remember me on this device
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="admin-login-button"
                                    >
                                        {processing ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                Secure Login
                                                <ArrowRight className="size-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <footer className="mt-2 border-t pt-6 text-center">
                        <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <ShieldCheck className="size-3.5" />
                            Protected by Enterprise-Grade Encryption
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
}
