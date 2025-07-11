import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "~/components/ui/Button";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/")({
    component: PublicIndex,
});

function PublicIndex() {
    return (
        <>
            <Authenticated>
                <Navigate to="/dashboard" />
            </Authenticated>

            <Unauthenticated>
                <div className="min-h-screen bg-surface-base">
                    {/* Header */}
                    <header className="border-b border-border-outline">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center py-6">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                            <Icon name="star" size="sm" className="text-white" />
                                        </div>
                                        <span className="text-xl font-bold text-text-primary">TanStack Starter</span>
                                    </div>
                                </div>
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
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center max-w-3xl mx-auto">
                                <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                                    Build Modern SaaS Apps{" "}
                                    <span className="text-primary">Lightning Fast</span>
                                </h1>
                                <p className="text-xl text-text-muted mb-8">
                                    A production-ready starter kit with TanStack, Convex, and modern tooling. 
                                    Skip the setup and start building features that matter.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/signup">
                                        <Button size="lg" className="w-full sm:w-auto">
                                            <Icon name="star" size="md" className="mr-2" />
                                            Start Building
                                        </Button>
                                    </Link>
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                        <Icon name="external" size="md" className="mr-2" />
                                        View Documentation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-card">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-text-primary mb-4">
                                    Everything You Need to Build
                                </h2>
                                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                                    From authentication to payments, we've got you covered with best-in-class tools.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon name="flash" size="lg" className="text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                                        Lightning Fast
                                    </h3>
                                    <p className="text-text-muted">
                                        Built with modern frameworks and optimized for performance.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon name="shield" size="lg" className="text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                                        Secure by Default
                                    </h3>
                                    <p className="text-text-muted">
                                        Built-in authentication, authorization, and security best practices.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon name="settings" size="lg" className="text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                                        Fully Customizable
                                    </h3>
                                    <p className="text-text-muted">
                                        Modular architecture that grows with your needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-text-primary mb-4">
                                    Trusted by Developers Worldwide
                                </h2>
                                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                                    See what developers are saying about TanStack Starter.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-surface-card rounded-lg border border-border-outline p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex text-yellow-500">
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                        </div>
                                    </div>
                                    <p className="text-text-muted mb-4">
                                        "TanStack Starter saved me weeks of setup time. The authentication system alone 
                                        is worth it. I was able to focus on building features instead of boilerplate."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">JS</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-text-primary">John Smith</p>
                                            <p className="text-sm text-text-muted">Senior Developer at TechCorp</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-card rounded-lg border border-border-outline p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex text-yellow-500">
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                        </div>
                                    </div>
                                    <p className="text-text-muted mb-4">
                                        "The best starter kit I've used. Clean code, great documentation, and excellent 
                                        support. Our team was productive from day one."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">SA</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-text-primary">Sarah Anderson</p>
                                            <p className="text-sm text-text-muted">CTO at StartupXYZ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-card rounded-lg border border-border-outline p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex text-yellow-500">
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                            <Icon name="star" size="sm" />
                                        </div>
                                    </div>
                                    <p className="text-text-muted mb-4">
                                        "Amazing starter kit! The billing integration with Stripe worked perfectly. 
                                        Highly recommend for any SaaS project."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">MJ</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-text-primary">Mike Johnson</p>
                                            <p className="text-sm text-text-muted">Founder at InnovateLabs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Social Proof Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-card">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-text-primary mb-4">
                                    Join Thousands of Happy Developers
                                </h2>
                                <p className="text-xl text-text-muted">
                                    Companies of all sizes trust TanStack Starter to power their applications.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-text-primary mb-2">10,000+</div>
                                    <div className="text-text-muted">Projects Created</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-text-primary mb-2">500+</div>
                                    <div className="text-text-muted">GitHub Stars</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-text-primary mb-2">50+</div>
                                    <div className="text-text-muted">Contributors</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-text-primary mb-2">99%</div>
                                    <div className="text-text-muted">Developer Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-text-primary mb-4">
                                Ready to Build Something Amazing?
                            </h2>
                            <p className="text-xl text-text-muted mb-8">
                                Join thousands of developers who are shipping faster with our starter kit.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/signup">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Get Started for Free
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Sign In
                                    </Button>
                                </Link>
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
                                        <li><a href="#" className="hover:text-text-primary">Features</a></li>
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
            </Unauthenticated>
        </>
    );
}
