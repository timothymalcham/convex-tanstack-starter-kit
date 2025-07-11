import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/Button";
import { Field } from "~/components/ui/Field";
import { Input } from "~/components/ui/Input";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/contact")({
    component: Contact,
});

function Contact() {
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
                        Get in Touch
                    </h1>
                    <p className="text-xl text-text-muted mb-8">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-surface-card rounded-lg border border-border-outline p-8">
                            <h2 className="text-2xl font-bold text-text-primary mb-6">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field.Root>
                                        <Field.Label>First Name</Field.Label>
                                        <Input placeholder="John" />
                                    </Field.Root>
                                    <Field.Root>
                                        <Field.Label>Last Name</Field.Label>
                                        <Input placeholder="Doe" />
                                    </Field.Root>
                                </div>
                                <Field.Root>
                                    <Field.Label>Email</Field.Label>
                                    <Input type="email" placeholder="john@example.com" />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Subject</Field.Label>
                                    <Input placeholder="How can we help?" />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Message</Field.Label>
                                    <textarea
                                        className="w-full min-h-[120px] p-3 border border-border-outline rounded-lg resize-none bg-surface-base text-text-primary"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </Field.Root>
                                <Button className="w-full" size="lg">
                                    <Icon name="mail" size="md" className="mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon name="mail" size="md" className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                                            <p className="text-text-muted">support@tanstackstarter.com</p>
                                            <p className="text-text-muted">hello@tanstackstarter.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon name="phone" size="md" className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                                            <p className="text-text-muted">+1 (555) 123-4567</p>
                                            <p className="text-text-muted">Mon-Fri 9AM-6PM EST</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon name="map" size="md" className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-text-primary mb-1">Office</h3>
                                            <p className="text-text-muted">123 Developer Street</p>
                                            <p className="text-text-muted">San Francisco, CA 94105</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
                                <div className="space-y-3">
                                    <Link to="/pricing" className="flex items-center gap-2 text-text-muted hover:text-text-primary">
                                        <Icon name="arrow-right" size="sm" />
                                        View Pricing
                                    </Link>
                                    <a href="#" className="flex items-center gap-2 text-text-muted hover:text-text-primary">
                                        <Icon name="arrow-right" size="sm" />
                                        Documentation
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-text-muted hover:text-text-primary">
                                        <Icon name="arrow-right" size="sm" />
                                        Support Center
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-text-muted hover:text-text-primary">
                                        <Icon name="arrow-right" size="sm" />
                                        Community Discord
                                    </a>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-surface-card rounded-lg border border-border-outline p-6">
                                <h3 className="text-lg font-semibold text-text-primary mb-3">Response Time</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">General Inquiries</span>
                                        <span className="text-text-primary font-medium">24 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Technical Support</span>
                                        <span className="text-text-primary font-medium">4 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Sales Inquiries</span>
                                        <span className="text-text-primary font-medium">2 hours</span>
                                    </div>
                                </div>
                            </div>
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