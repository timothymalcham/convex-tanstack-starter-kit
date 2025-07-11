import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
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
                        About TanStack Starter
                    </h1>
                    <p className="text-xl text-text-muted mb-8">
                        We're building the future of SaaS development, one starter kit at a time.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-card">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-text-muted mb-6">
                                We believe that building great software shouldn't be held back by repetitive setup tasks.
                                That's why we created TanStack Starter - to give developers the tools they need to focus
                                on what matters most: building amazing user experiences.
                            </p>
                            <p className="text-lg text-text-muted">
                                Our starter kit combines the best practices and tools from the React ecosystem,
                                pre-configured and ready to use, so you can ship faster and more confidently.
                            </p>
                        </div>
                        <div className="bg-surface-base rounded-lg p-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Icon name="star" size="md" className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">Quality First</h3>
                                        <p className="text-text-muted">Best practices built in from day one</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Icon name="flash" size="md" className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">Ship Faster</h3>
                                        <p className="text-text-muted">Skip the setup, focus on features</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Icon name="settings" size="md" className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">Developer Experience</h3>
                                        <p className="text-text-muted">Tools that make development enjoyable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text-primary mb-4">
                            Trusted by Developers
                        </h2>
                        <p className="text-xl text-text-muted">
                            Join thousands of developers who are building faster with our starter kit.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-text-primary mb-2">10k+</div>
                            <div className="text-text-muted">Downloads</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-text-primary mb-2">500+</div>
                            <div className="text-text-muted">GitHub Stars</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-text-primary mb-2">50+</div>
                            <div className="text-text-muted">Contributors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-text-primary mb-2">99%</div>
                            <div className="text-text-muted">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-card">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-text-primary mb-4">
                        Ready to Start Building?
                    </h2>
                    <p className="text-xl text-text-muted mb-8">
                        Join the community of developers who are shipping faster with TanStack Starter.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button size="lg" className="w-full sm:w-auto">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Contact Us
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