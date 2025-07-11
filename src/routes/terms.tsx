import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/terms")({
    component: Terms,
});

function Terms() {
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

            {/* Content */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-text-primary mb-4">Terms of Service</h1>
                        <p className="text-text-muted">Last updated: December 2024</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
                                <p className="text-text-muted mb-4">
                                    By accessing and using TanStack Starter, you accept and agree to be bound by the terms
                                    and provision of this agreement.
                                </p>
                                <p className="text-text-muted">
                                    If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">2. Description of Service</h2>
                                <p className="text-text-muted mb-4">
                                    TanStack Starter provides a comprehensive starter kit for building modern SaaS applications
                                    with React, TypeScript, and related technologies.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">Our services include:</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Pre-configured development environment</li>
                                    <li>Authentication and authorization systems</li>
                                    <li>Database and API integration</li>
                                    <li>UI components and styling</li>
                                    <li>Documentation and support</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">3. User Account</h2>
                                <p className="text-text-muted mb-4">
                                    To access certain features of the service, you must register for an account and provide
                                    accurate information.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">You are responsible for:</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Maintaining the confidentiality of your account</li>
                                    <li>All activities that occur under your account</li>
                                    <li>Notifying us of any unauthorized use</li>
                                    <li>Providing accurate registration information</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">4. Acceptable Use</h2>
                                <p className="text-text-muted mb-4">
                                    You agree to use the service only for lawful purposes and in accordance with these terms.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">You may not:</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Use the service for any illegal or unauthorized purpose</li>
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Interfere with or disrupt the service</li>
                                    <li>Attempt to gain unauthorized access to any part of the service</li>
                                    <li>Transmit any malicious code or harmful content</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">5. Intellectual Property</h2>
                                <p className="text-text-muted mb-4">
                                    The service and its original content, features, and functionality are owned by
                                    TanStack Starter and are protected by copyright, trademark, and other laws.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">License</h3>
                                <p className="text-text-muted">
                                    We grant you a limited, non-exclusive, non-transferable license to access and use
                                    the service for your personal or business purposes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">6. Payment Terms</h2>
                                <p className="text-text-muted mb-4">
                                    Some features of the service are provided on a paid subscription basis.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">Billing</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Subscription fees are billed in advance</li>
                                    <li>All fees are non-refundable unless required by law</li>
                                    <li>You may cancel your subscription at any time</li>
                                    <li>Price changes will be communicated in advance</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">7. Disclaimer of Warranties</h2>
                                <p className="text-text-muted mb-4">
                                    The service is provided on an "as is" and "as available" basis without warranties
                                    of any kind, either express or implied.
                                </p>
                                <p className="text-text-muted">
                                    We do not warrant that the service will be uninterrupted, error-free, or completely
                                    secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">8. Limitation of Liability</h2>
                                <p className="text-text-muted mb-4">
                                    In no event shall TanStack Starter be liable for any indirect, incidental, special,
                                    consequential, or punitive damages.
                                </p>
                                <p className="text-text-muted">
                                    Our total liability shall not exceed the amount paid by you for the service in the
                                    twelve months preceding the claim.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">9. Termination</h2>
                                <p className="text-text-muted mb-4">
                                    We may terminate or suspend your account and access to the service at any time,
                                    with or without cause, with or without notice.
                                </p>
                                <p className="text-text-muted">
                                    Upon termination, your right to use the service will cease immediately.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contact Information</h2>
                                <p className="text-text-muted mb-4">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <div className="bg-surface-card rounded-lg border border-border-outline p-6">
                                    <div className="space-y-2">
                                        <p className="text-text-muted">Email: legal@tanstackstarter.com</p>
                                        <p className="text-text-muted">Address: 123 Developer Street, San Francisco, CA 94105</p>
                                    </div>
                                </div>
                            </section>
                        </div>
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
                                <li><Link to="/about" className="hover:text-text-primary">About</Link></li>
                                <li><Link to="/contact" className="hover:text-text-primary">Contact</Link></li>
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