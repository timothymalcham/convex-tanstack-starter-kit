import { createFileRoute } from "@tanstack/react-router";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Field } from "~/components/ui/Field";
import { Input } from "~/components/ui/Input";
import { Select, SelectContent } from "~/components/ui/Select";
import { Switch } from "~/components/ui/Switch";
import { Tabs } from "~/components/ui/Tabs";
import { useTheme } from "~/contexts/ThemeContext";
import { useCurrentUser } from "~/hooks/useUser";
import { Icon } from "~/icons/icons";

export const Route = createFileRoute("/_authenticated/settings")({
    component: Settings,
});

function Settings() {
    const user = useCurrentUser();
    const { theme, setTheme } = useTheme();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-text-muted">Manage your account settings and preferences</p>
            </div>

            <Tabs.Root defaultValue="profile" className="w-full">
                <Tabs.List className="grid w-full grid-cols-5">
                    <Tabs.Tab value="profile">Profile</Tabs.Tab>
                    <Tabs.Tab value="appearance">Appearance</Tabs.Tab>
                    <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
                    <Tabs.Tab value="billing">Billing</Tabs.Tab>
                    <Tabs.Tab value="security">Security</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="profile" className="mt-6">
                    <div className="bg-surface-card border border-border-outline rounded-lg">
                        <div className="p-6 border-b border-border-outline">
                            <h3 className="text-lg font-semibold">Profile Information</h3>
                            <p className="text-sm text-text-muted">
                                Update your profile information and how others see you.
                            </p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar.Root size="lg">
                                    {user?.image && <Avatar.Image src={user?.image} alt={user?.name || "User"} />}
                                    <Avatar.Fallback>{(user?.name || "User").charAt(0)}</Avatar.Fallback>
                                </Avatar.Root>
                                <div className="flex-1">
                                    <Button variant="secondary" size="sm">
                                        Change Avatar
                                    </Button>
                                    <p className="text-sm text-text-muted mt-1">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field.Root>
                                    <Field.Label>Name</Field.Label>
                                    <Input defaultValue={user?.name || ""} placeholder="Your name" />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Email</Field.Label>
                                    <Input
                                        defaultValue={user?.email || ""}
                                        placeholder="your@email.com"
                                        type="email"
                                        disabled
                                    />
                                    <Field.Description>Email cannot be changed</Field.Description>
                                </Field.Root>
                            </div>

                            <Field.Root>
                                <Field.Label>Bio</Field.Label>
                                <textarea
                                    className="w-full min-h-[100px] p-3 border border-border-outline rounded-lg resize-none"
                                    placeholder="Tell us about yourself"
                                />
                            </Field.Root>
                        </div>
                        <div className="p-6 border-t border-border-outline">
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="appearance" className="mt-6">
                    <div className="bg-surface-card border border-border-outline rounded-lg">
                        <div className="p-6 border-b border-border-outline">
                            <h3 className="text-lg font-semibold">Appearance</h3>
                            <p className="text-sm text-text-muted">Customize the look and feel of your account.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <Field.Root>
                                <Field.Label>Theme</Field.Label>
                                <Select.Root value={theme} onValueChange={setTheme}>
                                    <Select.Trigger>
                                        <Select.Value placeholder="Select theme" />
                                    </Select.Trigger>
                                    <SelectContent>
                                        <Select.Item value="light">
                                            <Select.ItemText>
                                                <div className="flex items-center gap-2">
                                                    <Icon name="sun" size="md" />
                                                    Light
                                                </div>
                                            </Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="dark">
                                            <Select.ItemText>
                                                <div className="flex items-center gap-2">
                                                    <Icon name="moon" size="md" />
                                                    Dark
                                                </div>
                                            </Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="system">
                                            <Select.ItemText>
                                                <div className="flex items-center gap-2">
                                                    <Icon name="computer" size="md" />
                                                    System
                                                </div>
                                            </Select.ItemText>
                                        </Select.Item>
                                    </SelectContent>
                                </Select.Root>
                                <Field.Description>Choose your preferred theme or use system setting</Field.Description>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Language</Field.Label>
                                <Select.Root defaultValue="en">
                                    <Select.Trigger>
                                        <Select.Value placeholder="Select language" />
                                    </Select.Trigger>
                                    <SelectContent>
                                        <Select.Item value="en">
                                            <Select.ItemText>English</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="es">
                                            <Select.ItemText>Spanish</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="fr">
                                            <Select.ItemText>French</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item value="de">
                                            <Select.ItemText>German</Select.ItemText>
                                        </Select.Item>
                                    </SelectContent>
                                </Select.Root>
                            </Field.Root>
                        </div>
                        <div className="p-6 border-t border-border-outline">
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="notifications" className="mt-6">
                    <div className="bg-surface-card border border-border-outline rounded-lg">
                        <div className="p-6 border-b border-border-outline">
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <p className="text-sm text-text-muted">Configure how you receive notifications.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-text-muted">Receive notifications via email</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Push Notifications</p>
                                        <p className="text-sm text-text-muted">
                                            Receive push notifications in your browser
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Marketing Emails</p>
                                        <p className="text-sm text-text-muted">
                                            Receive marketing and promotional emails
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Weekly Summary</p>
                                        <p className="text-sm text-text-muted">Get a weekly summary of your activity</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-border-outline">
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="billing" className="mt-6">
                    <div className="bg-surface-card border border-border-outline rounded-lg">
                        <div className="p-6 border-b border-border-outline">
                            <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                            <p className="text-sm text-text-muted">
                                Manage your subscription, payment methods, and billing history.
                            </p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-surface-base border border-border-outline rounded-lg">
                                    <div>
                                        <p className="font-medium">Current Plan</p>
                                        <p className="text-sm text-text-muted">Free Plan</p>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        Upgrade
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">Payment Methods</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-4 bg-surface-base border border-border-outline rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                                    <Icon name="creditCard" size="sm" className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">•••• •••• •••• 4242</p>
                                                    <p className="text-sm text-text-muted">Expires 12/25</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                Remove
                                            </Button>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Icon name="plus" size="sm" className="mr-2" />
                                            Add Payment Method
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">Billing History</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-4 bg-surface-base border border-border-outline rounded-lg">
                                            <div>
                                                <p className="font-medium">Dec 2024</p>
                                                <p className="text-sm text-text-muted">Pro Plan - $29.00</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-success">Paid</span>
                                                <Button variant="ghost" size="sm">
                                                    <Icon name="download" size="sm" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-surface-base border border-border-outline rounded-lg">
                                            <div>
                                                <p className="font-medium">Nov 2024</p>
                                                <p className="text-sm text-text-muted">Pro Plan - $29.00</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-success">Paid</span>
                                                <Button variant="ghost" size="sm">
                                                    <Icon name="download" size="sm" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">Usage</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">API Calls</span>
                                            <span className="text-sm font-medium">1,250 / 10,000</span>
                                        </div>
                                        <div className="w-full bg-surface-base rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '12.5%' }}></div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Storage</span>
                                            <span className="text-sm font-medium">2.1 GB / 10 GB</span>
                                        </div>
                                        <div className="w-full bg-surface-base rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '21%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-border-outline">
                            <Button variant="outline">
                                <Icon name="external" size="sm" className="mr-2" />
                                Manage Subscription
                            </Button>
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="security" className="mt-6">
                    <div className="bg-surface-card border border-border-outline rounded-lg">
                        <div className="p-6 border-b border-border-outline">
                            <h3 className="text-lg font-semibold">Security</h3>
                            <p className="text-sm text-text-muted">
                                Manage your account security and privacy settings.
                            </p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Two-Factor Authentication</p>
                                        <p className="text-sm text-text-muted">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        Enable
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Login Sessions</p>
                                        <p className="text-sm text-text-muted">
                                            Manage and revoke active login sessions
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        Manage
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Change Password</p>
                                        <p className="text-sm text-text-muted">Update your account password</p>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        Change
                                    </Button>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-medium mb-4 text-destructive">Danger Zone</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Delete Account</p>
                                            <p className="text-sm text-text-muted">
                                                Permanently delete your account and all data
                                            </p>
                                        </div>
                                        <Button variant="destructive" size="sm">
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs.Panel>
            </Tabs.Root>
        </div>
    );
}
