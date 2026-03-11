import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { authService } from "../../../services/authService";

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        authService.login({ email: form.email });
        const redirectTo = location.state?.from?.pathname || "/dashboard";
        navigate(redirectTo, { replace: true });
    };

    return (
        <AuthShell
            title="Sign in to VMS"
            subtitle="Securely access your tenant workspace."
        >
            <form className="grid gap-4" onSubmit={handleSubmit}>
                <Input
                    label="Work Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }))
                    }
                />
                <Input
                    label="Password"
                    type="password"
                    required
                    value={form.password}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            password: event.target.value,
                        }))
                    }
                />
                <Button type="submit">Login</Button>
            </form>
            <p className="mt-4 text-sm text-slate-600">
                New tenant?{" "}
                <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                    Register organization
                </Link>
            </p>
        </AuthShell>
    );
}
