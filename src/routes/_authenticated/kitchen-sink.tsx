import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Accordion } from "../../components/ui/Accordion";
import { AlertDialog } from "../../components/ui/AlertDialog";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Checkbox, CheckboxWithLabel } from "../../components/ui/Checkbox";
import { Collapsible } from "../../components/ui/Collapsible";
import { Dialog } from "../../components/ui/Dialog";
import { Field } from "../../components/ui/Field";
import { Fieldset } from "../../components/ui/Fieldset";
import { Input } from "../../components/ui/Input";
import { Meter } from "../../components/ui/Meter";
import { NumberField } from "../../components/ui/NumberField";
import { Popover } from "../../components/ui/Popover";
import { PreviewCard, PreviewCardContent } from "../../components/ui/PreviewCard";
import { Progress } from "../../components/ui/Progress";
import { Radio, RadioGroup, RadioWithLabel } from "../../components/ui/Radio";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { Select, SelectContent } from "../../components/ui/Select";
import { Separator } from "../../components/ui/Separator";
import { Slider } from "../../components/ui/Slider";
import { Switch, SwitchWithLabel } from "../../components/ui/Switch";
import { Tabs } from "../../components/ui/Tabs";
import { Toggle } from "../../components/ui/Toggle";
import { ToggleGroup } from "../../components/ui/ToggleGroup";
import { Tooltip } from "../../components/ui/Tooltip";

export const Route = createFileRoute("/_authenticated/kitchen-sink")({
    component: KitchenSinkPage,
});

function KitchenSinkPage() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [switchChecked, setSwitchChecked] = React.useState(false);
    const [checkboxChecked, setCheckboxChecked] = React.useState(false);
    const [sliderValue, setSliderValue] = React.useState([50]);
    const [progressValue, setProgressValue] = React.useState(65);
    const [meterValue, setMeterValue] = React.useState(0.7);
    const [selectValue, setSelectValue] = React.useState("");
    const [radioValue, setRadioValue] = React.useState("");
    const [toggleValue, setToggleValue] = React.useState(false);
    const [toggleGroupValue, setToggleGroupValue] = React.useState<string[]>([]);
    const [numberValue, setNumberValue] = React.useState(42);

    // State for new label-enabled components
    const [switchWithLabelChecked, setSwitchWithLabelChecked] = React.useState(false);
    const [checkboxWithLabelChecked, setCheckboxWithLabelChecked] = React.useState(false);
    const [radioWithLabelValue, setRadioWithLabelValue] = React.useState("");

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue((prev) => (prev >= 100 ? 0 : prev + 1));
            setMeterValue((prev) => (prev >= 1 ? 0 : prev + 0.01));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        UI Component Kitchen Sink
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A comprehensive showcase of all available UI components in their various states and
                        configurations.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Buttons Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Buttons</h2>
                            <p className="text-gray-600 dark:text-gray-300">Primary interactions and actions</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Variants</h3>
                                    <div className="space-y-3">
                                        <Button variant="primary" className="w-full">
                                            Primary
                                        </Button>
                                        <Button variant="secondary" className="w-full">
                                            Secondary
                                        </Button>
                                        <Button variant="danger" className="w-full">
                                            Danger
                                        </Button>
                                        <Button variant="ghost" className="w-full">
                                            Ghost
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Sizes</h3>
                                    <div className="space-y-3">
                                        <Button size="sm" className="w-full">
                                            Small
                                        </Button>
                                        <Button size="md" className="w-full">
                                            Medium
                                        </Button>
                                        <Button size="lg" className="w-full">
                                            Large
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">States</h3>
                                    <div className="space-y-3">
                                        <Button className="w-full">Normal</Button>
                                        <Button disabled className="w-full">
                                            Disabled
                                        </Button>
                                        <Button fullWidth>Full Width</Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">With Icons</h3>
                                    <div className="space-y-3">
                                        <Button className="w-full">
                                            <span className="mr-2">📁</span>
                                            Save File
                                        </Button>
                                        <Button variant="secondary" className="w-full">
                                            <span className="mr-2">🔄</span>
                                            Refresh
                                        </Button>
                                        <Button variant="danger" className="w-full">
                                            <span className="mr-2">🗑️</span>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Form Controls Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Form Controls</h2>
                            <p className="text-gray-600 dark:text-gray-300">Input fields and form elements</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Input Fields */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Input Fields
                                </h3>
                                <Fieldset.Root className="border-none p-0">
                                    <div className="space-y-6">
                                        <Field.Root>
                                            <Field.Label>Email Address</Field.Label>
                                            <Input type="email" placeholder="john@example.com" />
                                            <Field.Description>We'll never share your email.</Field.Description>
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Password</Field.Label>
                                            <Input type="password" placeholder="Enter your password" />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Phone Number</Field.Label>
                                            <Input type="tel" placeholder="+1 (555) 123-4567" />
                                        </Field.Root>

                                        <div className="grid grid-cols-3 gap-4">
                                            <Input size="sm" placeholder="Small" />
                                            <Input size="md" placeholder="Medium" />
                                            <Input size="lg" placeholder="Large" />
                                        </div>

                                        <Input disabled placeholder="Disabled input" />
                                        <Input data-invalid placeholder="Invalid input" />
                                    </div>
                                </Fieldset.Root>
                            </div>

                            {/* Selection Controls */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Selection Controls
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Checkbox
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Checkbox.Root
                                                checked={checkboxChecked}
                                                onCheckedChange={setCheckboxChecked}
                                            >
                                                <Checkbox.Indicator />
                                            </Checkbox.Root>
                                            <span>Accept terms and conditions</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Switch
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                                            <span>Enable notifications</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Radio Group
                                        </label>
                                        <RadioGroup.Root
                                            value={radioValue}
                                            onValueChange={(value) => setRadioValue(value as string)}
                                        >
                                            <div className="space-y-2">
                                                <Radio.Root value="option1">
                                                    <Radio.Indicator />
                                                    <span className="ml-2">Option 1</span>
                                                </Radio.Root>
                                                <Radio.Root value="option2">
                                                    <Radio.Indicator />
                                                    <span className="ml-2">Option 2</span>
                                                </Radio.Root>
                                                <Radio.Root value="option3">
                                                    <Radio.Indicator />
                                                    <span className="ml-2">Option 3</span>
                                                </Radio.Root>
                                            </div>
                                        </RadioGroup.Root>
                                    </div>

                                    <Separator />

                                    {/* New Label-Enabled Components */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            Accessible Label Components
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Enhanced components with built-in label association for better
                                            accessibility.
                                        </p>

                                        <div className="space-y-4">
                                            <div>
                                                <CheckboxWithLabel
                                                    label="Subscribe to newsletter"
                                                    description="Get weekly updates about new features and tips"
                                                    checked={checkboxWithLabelChecked}
                                                    onCheckedChange={setCheckboxWithLabelChecked}
                                                />
                                            </div>

                                            <div>
                                                <SwitchWithLabel
                                                    label="Enable dark mode"
                                                    description="Switch between light and dark themes"
                                                    checked={switchWithLabelChecked}
                                                    onCheckedChange={setSwitchWithLabelChecked}
                                                />
                                            </div>

                                            <div>
                                                <SwitchWithLabel
                                                    label="Privacy mode"
                                                    labelPosition="left"
                                                    checked={false}
                                                    onCheckedChange={() => {}}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                    Payment Method
                                                </p>
                                                <RadioGroup.Root
                                                    value={radioWithLabelValue}
                                                    onValueChange={(value) => setRadioWithLabelValue(value as string)}
                                                >
                                                    <div className="space-y-3">
                                                        <RadioWithLabel
                                                            value="credit"
                                                            label="Credit Card"
                                                            description="Pay with your credit or debit card"
                                                        />
                                                        <RadioWithLabel
                                                            value="paypal"
                                                            label="PayPal"
                                                            description="Secure payment through PayPal"
                                                        />
                                                        <RadioWithLabel
                                                            value="bank"
                                                            label="Bank Transfer"
                                                            description="Direct transfer from your bank account"
                                                        />
                                                    </div>
                                                </RadioGroup.Root>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Select
                                        </label>
                                        <Select.Root value={selectValue} onValueChange={setSelectValue}>
                                            <Select.Trigger>
                                                <Select.Value placeholder="Choose an option..." />
                                                <Select.Icon />
                                            </Select.Trigger>
                                            <SelectContent>
                                                <Select.Item value="option1">
                                                    <Select.ItemText>Option 1</Select.ItemText>
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                                <Select.Item value="option2">
                                                    <Select.ItemText>Option 2</Select.ItemText>
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                                <Select.Item value="option3">
                                                    <Select.ItemText>Option 3</Select.ItemText>
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            </SelectContent>
                                        </Select.Root>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Feedback & Progress Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Feedback & Progress
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">Visual feedback and progress indicators</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Progress</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Progress Bar (Animated)
                                        </label>
                                        <Progress.Root value={progressValue} max={100}>
                                            <Progress.Track>
                                                <Progress.Indicator />
                                            </Progress.Track>
                                        </Progress.Root>
                                        <div className="text-sm text-gray-500 mt-1">{progressValue}%</div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Meter (Animated)
                                        </label>
                                        <Meter.Root value={meterValue} min={0} max={1}>
                                            <Meter.Track>
                                                <Meter.Indicator />
                                            </Meter.Track>
                                        </Meter.Root>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {Math.round(meterValue * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Slider</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Volume ({sliderValue[0]}%)
                                        </label>
                                        <Slider
                                            value={sliderValue}
                                            onValueChange={(value) =>
                                                setSliderValue(Array.isArray(value) ? value : [value])
                                            }
                                            max={100}
                                            step={1}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Number Field
                                        </label>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <NumberField.Root
                                                    value={numberValue}
                                                    onValueChange={(value) => setNumberValue(value ?? 0)}
                                                    min={0}
                                                    max={100}
                                                >
                                                    <NumberField.Group className="w-fit">
                                                        <NumberField.Decrement />
                                                        <NumberField.Input className="w-16" />
                                                        <NumberField.Increment />
                                                    </NumberField.Group>
                                                </NumberField.Root>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Medium (default)
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <NumberField.Root size="sm" defaultValue={5} min={1} max={10}>
                                                    <NumberField.Group className="w-fit">
                                                        <NumberField.Decrement />
                                                        <NumberField.Input className="w-12" />
                                                        <NumberField.Increment />
                                                    </NumberField.Group>
                                                </NumberField.Root>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Small size
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <NumberField.Root size="lg" defaultValue={1000} step={100}>
                                                    <NumberField.Group className="w-fit">
                                                        <NumberField.Decrement />
                                                        <NumberField.Input className="w-20" />
                                                        <NumberField.Increment />
                                                    </NumberField.Group>
                                                </NumberField.Root>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Large size
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Toggle</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Single Toggle
                                        </label>
                                        <Toggle pressed={toggleValue} onPressedChange={setToggleValue}>
                                            <span className="mr-2">⭐</span>
                                            Favorite
                                        </Toggle>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Toggle Group
                                        </label>
                                        <ToggleGroup value={toggleGroupValue} onValueChange={setToggleGroupValue}>
                                            <Toggle value="bold">B</Toggle>
                                            <Toggle value="italic">I</Toggle>
                                            <Toggle value="underline">U</Toggle>
                                        </ToggleGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Layout & Navigation Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Layout & Navigation
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">Structural components and navigation</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Tabs</h3>
                                <Tabs.Root defaultValue="tab1">
                                    <Tabs.List>
                                        <Tabs.Tab value="tab1">Dashboard</Tabs.Tab>
                                        <Tabs.Tab value="tab2">Analytics</Tabs.Tab>
                                        <Tabs.Tab value="tab3">Settings</Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel value="tab1">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Dashboard Content
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                Overview of your application metrics and key performance indicators.
                                            </p>
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="tab2">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Analytics Content
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                Detailed analytics and reporting for your data.
                                            </p>
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="tab3">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Settings Content
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                                Configure your application preferences and options.
                                            </p>
                                        </div>
                                    </Tabs.Panel>
                                </Tabs.Root>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Accordion</h3>
                                <Accordion.Root>
                                    <Accordion.Item value="item1">
                                        <Accordion.Header>
                                            <Accordion.Trigger>🚀 Getting Started</Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Panel>
                                            <div className="p-4 text-gray-600 dark:text-gray-300">
                                                Learn the basics of using our platform with this comprehensive guide.
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item value="item2">
                                        <Accordion.Header>
                                            <Accordion.Trigger>⚙️ Configuration</Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Panel>
                                            <div className="p-4 text-gray-600 dark:text-gray-300">
                                                Customize your setup with advanced configuration options.
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item value="item3">
                                        <Accordion.Header>
                                            <Accordion.Trigger>❓ FAQ</Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Panel>
                                            <div className="p-4 text-gray-600 dark:text-gray-300">
                                                Find answers to commonly asked questions.
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion.Root>
                            </div>
                        </div>
                    </section>

                    {/* Overlays & Dialogs Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Overlays & Dialogs
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">Modal dialogs and overlay components</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <Button onClick={() => setDialogOpen(true)} className="w-full mb-2">
                                        Open Dialog
                                    </Button>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Standard modal dialog</p>
                                </div>

                                <div className="text-center">
                                    <Button
                                        onClick={() => setAlertDialogOpen(true)}
                                        variant="danger"
                                        className="w-full mb-2"
                                    >
                                        Open Alert
                                    </Button>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Confirmation dialog</p>
                                </div>

                                <div className="text-center">
                                    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
                                        <Popover.Trigger asChild>
                                            <Button variant="secondary" className="w-full mb-2">
                                                Open Popover
                                            </Button>
                                        </Popover.Trigger>
                                        <Popover.Portal>
                                            <Popover.Positioner>
                                                <Popover.Popup className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
                                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                                        Popover Content
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                        This is a popover with some content.
                                                    </p>
                                                    <Button size="sm" onClick={() => setPopoverOpen(false)}>
                                                        Close
                                                    </Button>
                                                </Popover.Popup>
                                            </Popover.Positioner>
                                        </Popover.Portal>
                                    </Popover.Root>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Floating content</p>
                                </div>

                                <div className="text-center">
                                    <Tooltip.Provider>
                                        <Tooltip.Root>
                                            <Tooltip.Trigger asChild>
                                                <Button variant="ghost" className="w-full mb-2">
                                                    Hover for Tooltip
                                                </Button>
                                            </Tooltip.Trigger>
                                            <Tooltip.Portal>
                                                <Tooltip.Positioner>
                                                    <Tooltip.Popup className="bg-gray-900 text-white px-2 py-1 rounded text-sm">
                                                        This is a helpful tooltip
                                                    </Tooltip.Popup>
                                                </Tooltip.Positioner>
                                            </Tooltip.Portal>
                                        </Tooltip.Root>
                                    </Tooltip.Provider>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Hover for info</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Display & Media Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Display & Media</h2>
                            <p className="text-gray-600 dark:text-gray-300">Avatars, cards, and media components</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Avatars</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar.Root className="w-8 h-8">
                                            <Avatar.Image
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                                                alt="Small avatar"
                                            />
                                            <Avatar.Fallback>SM</Avatar.Fallback>
                                        </Avatar.Root>
                                        <Avatar.Root className="w-12 h-12">
                                            <Avatar.Image
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                                                alt="Medium avatar"
                                            />
                                            <Avatar.Fallback>MD</Avatar.Fallback>
                                        </Avatar.Root>
                                        <Avatar.Root className="w-16 h-16">
                                            <Avatar.Image
                                                src="https://images.unsplash.com/photo-1494790108755-2616b612c4d8?w=64&h=64&fit=crop&crop=face"
                                                alt="Large avatar"
                                            />
                                            <Avatar.Fallback>LG</Avatar.Fallback>
                                        </Avatar.Root>
                                        <Avatar.Root className="w-20 h-20">
                                            <Avatar.Fallback className="text-lg">XL</Avatar.Fallback>
                                        </Avatar.Root>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                            User Profiles
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Avatar.Root>
                                                    <Avatar.Image
                                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                                                        alt="John Doe"
                                                    />
                                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                                </Avatar.Root>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm text-gray-500">Software Engineer</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Avatar.Root>
                                                    <Avatar.Image
                                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                                                        alt="Jane Smith"
                                                    />
                                                    <Avatar.Fallback>JS</Avatar.Fallback>
                                                </Avatar.Root>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        Jane Smith
                                                    </div>
                                                    <div className="text-sm text-gray-500">Product Designer</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Preview Cards
                                </h3>
                                <div className="space-y-4">
                                    <PreviewCard.Root>
                                        <PreviewCard.Trigger href="https://example.com" className="block">
                                            <img
                                                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                                                alt="Beautiful Landscape"
                                                className="w-full h-32 object-cover rounded mb-2"
                                            />
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Beautiful Landscape
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                A stunning mountain view with crystal clear lakes
                                            </p>
                                        </PreviewCard.Trigger>
                                        <PreviewCardContent>
                                            <div className="p-4">
                                                <h4 className="font-medium">Beautiful Landscape</h4>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    A stunning mountain view with crystal clear lakes
                                                </p>
                                            </div>
                                        </PreviewCardContent>
                                    </PreviewCard.Root>
                                    <PreviewCard.Root>
                                        <PreviewCard.Trigger href="https://example.com" className="block">
                                            <img
                                                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop"
                                                alt="Modern Architecture"
                                                className="w-full h-32 object-cover rounded mb-2"
                                            />
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Modern Architecture
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Innovative building design in the heart of the city
                                            </p>
                                        </PreviewCard.Trigger>
                                        <PreviewCardContent>
                                            <div className="p-4">
                                                <h4 className="font-medium">Modern Architecture</h4>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    Innovative building design in the heart of the city
                                                </p>
                                            </div>
                                        </PreviewCardContent>
                                    </PreviewCard.Root>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Utilities Section */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Utilities</h2>
                            <p className="text-gray-600 dark:text-gray-300">Helpful utility components</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Collapsible
                                </h3>
                                <Collapsible.Root>
                                    <Collapsible.Trigger asChild>
                                        <Button variant="ghost" className="w-full justify-between">
                                            Advanced Settings
                                            <span>▼</span>
                                        </Button>
                                    </Collapsible.Trigger>
                                    <Collapsible.Panel>
                                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                                            <Fieldset.Root className="border-none p-0">
                                                <Field.Root>
                                                    <Field.Label>API Key</Field.Label>
                                                    <Input type="password" placeholder="Enter your API key" />
                                                </Field.Root>
                                                <Field.Root>
                                                    <Field.Label>Webhook URL</Field.Label>
                                                    <Input placeholder="https://your-webhook.com" />
                                                </Field.Root>
                                            </Fieldset.Root>
                                            <CheckboxWithLabel
                                                label="Enable debug mode"
                                                description="Show detailed debugging information"
                                            />
                                        </div>
                                    </Collapsible.Panel>
                                </Collapsible.Root>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Scroll Area
                                </h3>
                                <ScrollArea.Root className="h-48 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <ScrollArea.Viewport className="h-full p-4">
                                        <div className="space-y-3">
                                            {Array.from({ length: 20 }, (_, i) => (
                                                <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        Item {i + 1}
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        This is a scrollable item with some content that demonstrates
                                                        the scroll area component.
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea.Viewport>
                                    <ScrollArea.Scrollbar orientation="vertical">
                                        <ScrollArea.Thumb />
                                    </ScrollArea.Scrollbar>
                                </ScrollArea.Root>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="text-center mt-24 pt-12 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">
                        🎨 Built with love using TanStack Start, Base UI, and Tailwind CSS
                    </p>
                </div>
            </div>

            {/* Dialog Components */}
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Example Dialog
                        </Dialog.Title>
                        <Dialog.Description className="text-gray-600 dark:text-gray-300 mb-6">
                            This is an example dialog that demonstrates the modal component functionality.
                        </Dialog.Description>
                        <div className="flex justify-end space-x-3">
                            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                        </div>
                    </Dialog.Popup>
                </Dialog.Portal>
            </Dialog.Root>

            <AlertDialog.Root open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialog.Portal>
                    <AlertDialog.Backdrop className="fixed inset-0 bg-black/50" />
                    <AlertDialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <AlertDialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Are you sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-gray-600 dark:text-gray-300 mb-6">
                            This action cannot be undone. This will permanently delete the item.
                        </AlertDialog.Description>
                        <div className="flex justify-end space-x-3">
                            <AlertDialog.Close>
                                <Button variant="secondary">Cancel</Button>
                            </AlertDialog.Close>
                            <AlertDialog.Close>
                                <Button variant="danger">Delete</Button>
                            </AlertDialog.Close>
                        </div>
                    </AlertDialog.Popup>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    );
}
