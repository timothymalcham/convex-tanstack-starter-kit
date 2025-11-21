import { createFileRoute } from '@tanstack/react-router'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Container } from '@/components/ui/container'

export const Route = createFileRoute("/sign-up")({
    component: SignUp,
});

export function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        const { data, error } = await authClient.signUp.email(
            {
                email,
                password,
                name: `${firstName} ${lastName}`,
            },
            {
                onRequest: () => {
                    setLoading(true);
                },
                onSuccess: async () => {
                    setLoading(false);
                    await navigate({ to: "/" });
                },
                onError: async (ctx) => {
                    setLoading(false);
                    console.error(ctx.error);
                    console.error("response", ctx.response);
                    alert(ctx.error.message);
                },
            }
        );
        console.log({ data, error });
    };

    return (
        <Container>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Jane"
                                    required
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    value={firstName}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Doe"
                                    required
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    value={lastName}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            onClick={handleSignUp}
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Create an account"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <p className="text-center mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Already have an account?{" "}
                <Link
                    to="/sign-in"
                    className="text-orange-400 hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-200 underline"
                >
                    Sign in
                </Link>
            </p>
        </Container>
    );
}
