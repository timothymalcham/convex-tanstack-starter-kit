import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/privacy")({
    component: Privacy,
});

function Privacy() {
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
                        <h1 className="text-4xl font-bold text-text-primary mb-4">Privacy Policy</h1>
                        <p className="text-text-muted">Last updated: December 2024</p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
                                <p className="text-text-muted mb-4">
                                    We collect information you provide directly to us, such as when you create an account,
                                    subscribe to our newsletter, or contact us for support.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">Personal Information</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Name and email address</li>
                                    <li>Account credentials</li>
                                    <li>Payment information</li>
                                    <li>Communication preferences</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">2. How We Use Your Information</h2>
                                <p className="text-text-muted mb-4">
                                    We use the information we collect to provide, maintain, and improve our services.
                                </p>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Provide and deliver our services</li>
                                    <li>Process transactions and send notifications</li>
                                    <li>Respond to your comments and questions</li>
                                    <li>Send you technical notices and support messages</li>
                                    <li>Communicate with you about new features and updates</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">3. Information Sharing</h2>
                                <p className="text-text-muted mb-4">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties
                                    without your consent, except as described in this policy.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">We may share information:</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>With your consent</li>
                                    <li>To comply with legal obligations</li>
                                    <li>To protect our rights and property</li>
                                    <li>With service providers who assist us in operating our platform</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">4. Data Security</h2>
                                <p className="text-text-muted mb-4">
                                    We implement appropriate security measures to protect your personal information against
                                    unauthorized access, alteration, disclosure, or destruction.
                                </p>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Encryption of data in transit and at rest</li>
                                    <li>Regular security audits and monitoring</li>
                                    <li>Access controls and authentication</li>
                                    <li>Secure development practices</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">5. Your Rights</h2>
                                <p className="text-text-muted mb-4">
                                    You have certain rights regarding your personal information, including:
                                </p>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Access to your personal information</li>
                                    <li>Correction of inaccurate information</li>
                                    <li>Deletion of your personal information</li>
                                    <li>Portability of your data</li>
                                    <li>Opt-out of marketing communications</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">6. Cookies and Analytics</h2>
                                <p className="text-text-muted mb-4">
                                    We use cookies and similar technologies to enhance your experience and analyze usage patterns.
                                </p>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">Types of cookies we use:</h3>
                                <ul className="list-disc list-inside text-text-muted space-y-1">
                                    <li>Essential cookies for basic functionality</li>
                                    <li>Analytics cookies to understand usage</li>
                                    <li>Preference cookies to remember your settings</li>
                                    <li>Marketing cookies (with your consent)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-4">7. Contact Us</h2>
                                <p className="text-text-muted mb-4">
                                    If you have any questions about this Privacy Policy, please contact us:
                                </p>
                                <div className="bg-surface-card rounded-lg border border-border-outline p-6">
                                    <div className="space-y-2">
                                        <p className="text-text-muted">Email: privacy@tanstackstarter.com</p>
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