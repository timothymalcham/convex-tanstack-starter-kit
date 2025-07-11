import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/pricing")({
    component: Pricing,
});

function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started",
            features: [
                "1 project",
                "Up to 5 team members",
                "Basic features",
                "Community support",
                "2GB storage",
            ],
            cta: "Get Started",
            popular: false,
        },
        {
            name: "Pro",
            price: "$29",
            period: "per month",
            description: "For growing teams",
            features: [
                "Unlimited projects",
                "Unlimited team members",
                "Advanced features",
                "Priority support",
                "100GB storage",
                "Custom integrations",
                "Analytics dashboard",
            ],
            cta: "Start Free Trial",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "contact us",
            description: "For large organizations",
            features: [
                "Everything in Pro",
                "Custom branding",
                "SSO authentication",
                "Dedicated support",
                "Unlimited storage",
                "Custom contracts",
                "Advanced security",
            ],
            cta: "Contact Sales",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-surface-base">
            {/* Header */}
            <header className="border-b border-border-outline">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <Link to="/" className="flex items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Icon name="star" size="sm" className="text-white" />
                                </div>
                                <span className="text-xl font-bold text-text-primary">TanStack Starter</span>
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-text-muted mb-8">
                        Choose the plan that's right for you. Upgrade or downgrade at any time.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-lg border p-8 ${
                                    plan.popular
                                        ? "border-primary bg-surface-card scale-105"
                                        : "border-border-outline bg-surface-card"
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                                    <p className="text-text-muted mb-4">{plan.description}</p>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                                        <span className="text-text-muted ml-2">/{plan.period}</span>
                                    </div>
                                    <Button
                                        className="w-full mb-8"
                                        variant={plan.popular ? "primary" : "secondary"}
                                    >
                                        {plan.cta}
                                    </Button>
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <Icon name="check" size="sm" className="text-green-500 flex-shrink-0" />
                                            <span className="text-text-muted">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-card">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text-primary mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-text-muted">
                            Everything you need to know about our pricing.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                Can I change my plan at any time?
                            </h3>
                            <p className="text-text-muted">
                                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately,
                                and you'll be prorated for the difference.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                Is there a free trial?
                            </h3>
                            <p className="text-text-muted">
                                Yes, all paid plans come with a 14-day free trial. No credit card required.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                What payment methods do you accept?
                            </h3>
                            <p className="text-text-muted">
                                We accept all major credit cards, PayPal, and ACH transfers for Enterprise plans.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                Can I cancel at any time?
                            </h3>
                            <p className="text-text-muted">
                                Yes, you can cancel your subscription at any time. You'll continue to have access until
                                the end of your billing period.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-text-primary mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-text-muted mb-8">
                        Join thousands of developers building amazing applications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button size="lg" className="w-full sm:w-auto">
                                Start Free Trial
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border-outline py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Icon name="star" size="sm" className="text-white" />
                                </div>
                                <span className="text-xl font-bold text-text-primary">TanStack Starter</span>
                            </div>
                            <p className="text-text-muted">
                                The fastest way to build modern SaaS applications.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
                            <ul className="space-y-2 text-text-muted">
                                <li><Link to="/" className="hover:text-text-primary">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-text-primary">Pricing</Link></li>
                                <li><a href="#" className="hover:text-text-primary">Documentation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
                            <ul className="space-y-2 text-text-muted">
                                <li><a href="#" className="hover:text-text-primary">About</a></li>
                                <li><a href="#" className="hover:text-text-primary">Contact</a></li>
                                <li><a href="#" className="hover:text-text-primary">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
                            <ul className="space-y-2 text-text-muted">
                                <li><Link to="/privacy" className="hover:text-text-primary">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-text-primary">Terms of Service</Link></li>
                                <li><a href="#" className="hover:text-text-primary">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border-outline mt-8 pt-8 text-center text-text-muted">
                        <p>&copy; 2024 TanStack Starter. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}