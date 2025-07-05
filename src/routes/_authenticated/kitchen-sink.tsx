import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Accordion } from "@/components/ui/Accordion";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Checkbox, CheckboxWithLabel } from "@/components/ui/Checkbox";
import { Collapsible } from "@/components/ui/Collapsible";
import { Dialog } from "@/components/ui/Dialog";
import { Field } from "@/components/ui/Field";
import { Fieldset } from "@/components/ui/Fieldset";
import { Input } from "@/components/ui/Input";
import { Meter } from "@/components/ui/Meter";
import { NumberField } from "@/components/ui/NumberField";
import { Popover } from "@/components/ui/Popover";
import { PreviewCard, PreviewCardContent } from "@/components/ui/PreviewCard";
import { Progress } from "@/components/ui/Progress";
import { Radio, RadioGroup, RadioWithLabel } from "@/components/ui/Radio";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Select, SelectContent } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Switch, SwitchWithLabel } from "@/components/ui/Switch";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { Tooltip } from "@/components/ui/Tooltip";

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
        <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800/50">
            <div className="container mx-auto px-8 py-16">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 mb-6 border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
                        <svg
                            className="w-8 h-8 text-neutral-600 dark:text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100 bg-clip-text text-transparent mb-6 tracking-tight">
                        Component Library
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        A meticulously crafted collection of UI components showcasing elegant design patterns and
                        seamless user interactions.
                    </p>
                </div>

                <div className="space-y-32">
                    {/* Buttons Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    INTERACTIVE
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Buttons
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Elegant interactions that drive user engagement
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white via-neutral-50/50 to-white dark:from-neutral-900 dark:via-neutral-800/50 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60 backdrop-blur-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Variants
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Different visual styles
                                        </p>
                                    </div>
                                    <div className="space-y-4">
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
                                        <Button variant="shimmer" className="w-full">
                                            Shimmer
                                        </Button>
                                        <Button variant="glow" className="w-full">
                                            Glow
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Sizes
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Perfect proportions
                                        </p>
                                    </div>
                                    <div className="space-y-4">
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

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            States
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Interactive feedback
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <Button className="w-full">Normal</Button>
                                        <Button disabled className="w-full">
                                            Disabled
                                        </Button>
                                        <Button fullWidth>Full Width</Button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            With Icons
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Enhanced clarity
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <Button className="w-full group">
                                            <svg
                                                className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                                />
                                            </svg>
                                            Save File
                                        </Button>
                                        <Button variant="secondary" className="w-full group">
                                            <svg
                                                className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            Refresh
                                        </Button>
                                        <Button variant="danger" className="w-full group">
                                            <svg
                                                className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Form Controls Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    INPUT
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Form Controls
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Seamless data capture with elegant validation
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Input Fields */}
                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Input Fields
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Text and data entry
                                        </p>
                                    </div>
                                </div>
                                <Fieldset.Root className="border-none p-0">
                                    <div className="space-y-8">
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

                                        <div className="space-y-4">
                                            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                Size Variations
                                            </p>
                                            <div className="grid grid-cols-3 gap-4">
                                                <Input size="sm" placeholder="Small" />
                                                <Input size="md" placeholder="Medium" />
                                                <Input size="lg" placeholder="Large" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                Input States
                                            </p>
                                            <div className="space-y-3">
                                                <Input disabled placeholder="Disabled input" />
                                                <Input data-invalid placeholder="Invalid input" />
                                            </div>
                                        </div>
                                    </div>
                                </Fieldset.Root>
                            </div>

                            {/* Selection Controls */}
                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Selection Controls
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Choice and preference inputs
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Checkbox
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <Checkbox.Root
                                                checked={checkboxChecked}
                                                onCheckedChange={setCheckboxChecked}
                                            >
                                                <Checkbox.Indicator />
                                            </Checkbox.Root>
                                            <span className="text-neutral-700 dark:text-neutral-300">
                                                Accept terms and conditions
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Switch
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                                            <span className="text-neutral-700 dark:text-neutral-300">
                                                Enable notifications
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Radio Group
                                        </label>
                                        <RadioGroup.Root
                                            value={radioValue}
                                            onValueChange={(value) => setRadioValue(value as string)}
                                        >
                                            <div className="space-y-3">
                                                <Radio.Root value="option1">
                                                    <Radio.Indicator />
                                                    <span className="ml-3 text-neutral-700 dark:text-neutral-300">
                                                        Option 1
                                                    </span>
                                                </Radio.Root>
                                                <Radio.Root value="option2">
                                                    <Radio.Indicator />
                                                    <span className="ml-3 text-neutral-700 dark:text-neutral-300">
                                                        Option 2
                                                    </span>
                                                </Radio.Root>
                                                <Radio.Root value="option3">
                                                    <Radio.Indicator />
                                                    <span className="ml-3 text-neutral-700 dark:text-neutral-300">
                                                        Option 3
                                                    </span>
                                                </Radio.Root>
                                            </div>
                                        </RadioGroup.Root>
                                    </div>

                                    <div className="border-t border-neutral-200/60 dark:border-neutral-700/60"></div>

                                    {/* New Label-Enabled Components */}
                                    <div className="p-6 bg-gradient-to-br from-emerald-50/50 to-green-50/30 dark:from-emerald-900/10 dark:to-green-900/5 rounded-2xl border border-emerald-200/40 dark:border-emerald-700/30">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                                Accessible Label Components
                                            </h4>
                                        </div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                                            Enhanced components with built-in label association for better accessibility
                                            and user experience.
                                        </p>

                                        <div className="space-y-6">
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

                                            <div className="p-4 bg-white/60 dark:bg-neutral-800/40 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50">
                                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                                                    Payment Method
                                                </p>
                                                <RadioGroup.Root
                                                    value={radioWithLabelValue}
                                                    onValueChange={(value) => setRadioWithLabelValue(value as string)}
                                                >
                                                    <div className="space-y-4">
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

                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
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
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    PROGRESS
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Feedback & Progress
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Real-time visual feedback and status indicators
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Progress
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Visual completion status
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Progress Bar (Animated)
                                        </label>
                                        <Progress.Root value={progressValue} max={100}>
                                            <Progress.Track>
                                                <Progress.Indicator />
                                            </Progress.Track>
                                        </Progress.Root>
                                        <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 font-medium">
                                            {progressValue}%
                                        </div>
                                    </div>

                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Meter (Animated)
                                        </label>
                                        <Meter.Root value={meterValue} min={0} max={1}>
                                            <Meter.Track>
                                                <Meter.Indicator />
                                            </Meter.Track>
                                        </Meter.Root>
                                        <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 font-medium">
                                            {Math.round(meterValue * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Slider
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Range selection controls
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
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

                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Number Field
                                        </label>
                                        <div className="space-y-6">
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
                                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
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
                                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
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
                                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    Large size
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Toggle
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            On/off state controls
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                                            Single Toggle
                                        </label>
                                        <Toggle pressed={toggleValue} onPressedChange={setToggleValue}>
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Favorite
                                        </Toggle>
                                    </div>

                                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">
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
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    NAVIGATION
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Layout & Navigation
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Structural components for seamless user journeys
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M8 5v4m4-4v4m4-4v4"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Tabs
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Organized content switching
                                        </p>
                                    </div>
                                </div>
                                <Tabs.Root defaultValue="tab1">
                                    <Tabs.List>
                                        <Tabs.Tab value="tab1">Dashboard</Tabs.Tab>
                                        <Tabs.Tab value="tab2">Analytics</Tabs.Tab>
                                        <Tabs.Tab value="tab3">Settings</Tabs.Tab>
                                        <Tabs.Indicator />
                                    </Tabs.List>
                                    <Tabs.Panel value="tab1">
                                        <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl mt-6 border border-neutral-200/40 dark:border-neutral-700/40">
                                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                                Dashboard Content
                                            </h4>
                                            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                                                Overview of your application metrics and key performance indicators.
                                            </p>
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="tab2">
                                        <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl mt-6 border border-neutral-200/40 dark:border-neutral-700/40">
                                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                                Analytics Content
                                            </h4>
                                            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                                                Detailed analytics and reporting for your data.
                                            </p>
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="tab3">
                                        <div className="p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl mt-6 border border-neutral-200/40 dark:border-neutral-700/40">
                                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                                Settings Content
                                            </h4>
                                            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                                                Configure your application preferences and options.
                                            </p>
                                        </div>
                                    </Tabs.Panel>
                                </Tabs.Root>
                            </div>

                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Accordion
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Collapsible content sections
                                        </p>
                                    </div>
                                </div>
                                <Accordion.Root>
                                    <Accordion.Item value="item1">
                                        <Accordion.Header>
                                            <Accordion.Trigger>
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                                Getting Started
                                            </Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Panel>
                                            <div className="p-6 text-neutral-600 dark:text-neutral-400 bg-neutral-50/30 dark:bg-neutral-800/20 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40">
                                                Learn the basics of using our platform with this comprehensive guide and
                                                step-by-step tutorials.
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item value="item2">
                                        <Accordion.Header>
                                            <Accordion.Trigger>
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                Configuration
                                            </Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Panel>
                                            <div className="p-6 text-neutral-600 dark:text-neutral-400 bg-neutral-50/30 dark:bg-neutral-800/20 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40">
                                                Customize your setup with advanced configuration options and
                                                personalized settings.
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                    <Accordion.Item value="item3">
                                        <Accordion.Header>
                                            <Accordion.Trigger>
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                FAQ
                                            </Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Panel>
                                            <div className="p-6 text-neutral-600 dark:text-neutral-400 bg-neutral-50/30 dark:bg-neutral-800/20 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40">
                                                Find answers to commonly asked questions and troubleshooting guides.
                                            </div>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </Accordion.Root>
                            </div>
                        </div>
                    </section>

                    {/* Overlays & Dialogs Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    OVERLAY
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Overlays & Dialogs
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Modal interfaces for focused interactions
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-center p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                    <Button onClick={() => setDialogOpen(true)} className="w-full mb-4">
                                        Open Dialog
                                    </Button>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Standard modal dialog
                                    </p>
                                </div>

                                <div className="text-center p-6 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-2xl border border-neutral-200/40 dark:border-neutral-700/40">
                                    <Button
                                        onClick={() => setAlertDialogOpen(true)}
                                        variant="danger"
                                        className="w-full mb-4"
                                    >
                                        Open Alert
                                    </Button>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        Confirmation dialog
                                    </p>
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
                                                <Popover.Popup className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 shadow-lg">
                                                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                                        Popover Content
                                                    </h4>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                                        This is a popover with some content.
                                                    </p>
                                                    <Button size="sm" onClick={() => setPopoverOpen(false)}>
                                                        Close
                                                    </Button>
                                                </Popover.Popup>
                                            </Popover.Positioner>
                                        </Popover.Portal>
                                    </Popover.Root>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Floating content</p>
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
                                                    <Tooltip.Popup>
                                                        <Tooltip.Arrow />
                                                        Hover for info
                                                    </Tooltip.Popup>
                                                </Tooltip.Positioner>
                                            </Tooltip.Portal>
                                        </Tooltip.Root>
                                    </Tooltip.Provider>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Hover for info</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Display & Media Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    MEDIA
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Display & Media
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Visual content and media representation
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Avatars
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            User profile representations
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar.Root size="sm" fallbackColor="blue">
                                            <Avatar.Image
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                                                alt="Small avatar"
                                            />
                                            <Avatar.Fallback />
                                        </Avatar.Root>
                                        <Avatar.Root size="md" fallbackColor="green">
                                            <Avatar.Image
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                                                alt="Medium avatar"
                                            />
                                            <Avatar.Fallback />
                                        </Avatar.Root>
                                        <Avatar.Root size="lg" fallbackColor="purple">
                                            <Avatar.Fallback />
                                        </Avatar.Root>
                                        <Avatar.Root size="xl" fallbackColor="pink">
                                            <Avatar.Fallback />
                                        </Avatar.Root>
                                    </div>

                                    <div className="border-t border-neutral-200/60 dark:border-neutral-700/60"></div>

                                    <div>
                                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                                            User Profiles
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Avatar.Root fallbackColor="orange">
                                                    <Avatar.Image
                                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                                                        alt="John Doe"
                                                    />
                                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                                </Avatar.Root>
                                                <div>
                                                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                                        Software Engineer
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Avatar.Root fallbackColor="teal">
                                                    <Avatar.Image
                                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                                                        alt="Jane Smith"
                                                    />
                                                    <Avatar.Fallback>JS</Avatar.Fallback>
                                                </Avatar.Root>
                                                <div>
                                                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                                        Jane Smith
                                                    </div>
                                                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                                        Product Designer
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Preview Cards
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Rich content previews
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4 grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <PreviewCard.Root>
                                            <PreviewCard.Trigger
                                                href="https://example.com"
                                                className="group block relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 transform hover:-translate-y-0.5 border-blue-800"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative">
                                                    <div className="aspect-[3/2] overflow-hidden">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                                                            alt="Beautiful Landscape"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                                                Featured
                                                            </span>
                                                        </div>
                                                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            Beautiful Landscape
                                                        </h4>
                                                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                                                            A stunning mountain view with crystal clear lakes
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                                <svg
                                                                    className="w-3 h-3"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Norway
                                                            </div>
                                                            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                                <svg
                                                                    className="w-3 h-3"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Photography
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PreviewCard.Trigger>
                                            <PreviewCardContent showArrow className="max-w-md">
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                            <svg
                                                                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                                Beautiful Landscape
                                                            </h4>
                                                            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                                                                Experience breathtaking mountain vistas and pristine
                                                                alpine lakes in this stunning Norwegian landscape.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3 text-center">
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                                            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                                                4K
                                                            </div>
                                                            <div className="text-xs text-neutral-500">Resolution</div>
                                                        </div>
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                                            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                                                HD
                                                            </div>
                                                            <div className="text-xs text-neutral-500">Quality</div>
                                                        </div>
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                                            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                                                Free
                                                            </div>
                                                            <div className="text-xs text-neutral-500">License</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700 pt-3">
                                                        📸 by Nature Photography • unsplash.com
                                                    </div>
                                                </div>
                                            </PreviewCardContent>
                                        </PreviewCard.Root>
                                    </div>

                                    <div className="col-span-1">
                                        <PreviewCard.Root>
                                            <PreviewCard.Trigger
                                                href="https://example.com"
                                                className="group block relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/20 transform hover:-translate-y-0.5"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative">
                                                    <div className="aspect-[3/2] overflow-hidden">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop"
                                                            alt="Modern Architecture"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                                                                Architecture
                                                            </span>
                                                        </div>
                                                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                            Modern Architecture
                                                        </h4>
                                                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                                                            Innovative building design in the heart of the city
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                                <svg
                                                                    className="w-3 h-3"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                New York
                                                            </div>
                                                            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                                <svg
                                                                    className="w-3 h-3"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                                                </svg>
                                                                Commercial
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PreviewCard.Trigger>
                                            <PreviewCardContent showArrow className="max-w-md">
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                                            <svg
                                                                className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1a1 1 0 100-2h-1zm-1-1H7v4h6v-4zm2-2h1a1 1 0 100-2h-1v2zm1-4h-1V6h1a1 1 0 110 2z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                                Modern Architecture
                                                            </h4>
                                                            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                                                                Cutting-edge urban development featuring sustainable
                                                                design and innovative structural engineering.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3 text-center">
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                                            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                                                2024
                                                            </div>
                                                            <div className="text-xs text-neutral-500">Year Built</div>
                                                        </div>
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                                            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                                                50F
                                                            </div>
                                                            <div className="text-xs text-neutral-500">Floors</div>
                                                        </div>
                                                        <div className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                                                            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                                                LEED
                                                            </div>
                                                            <div className="text-xs text-neutral-500">Certified</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700 pt-3">
                                                        🏢 by Urban Studios • architecture.com
                                                    </div>
                                                </div>
                                            </PreviewCardContent>
                                        </PreviewCard.Root>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Utilities Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                                    UTILITY
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                Utilities
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                                Essential building blocks for complex interfaces
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200/60 dark:border-neutral-700/60">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                                        <svg
                                            className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                                            Collapsible
                                        </h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Expandable content areas
                                        </p>
                                    </div>
                                </div>
                                <Collapsible.Root>
                                    <Collapsible.Trigger>
                                        <span>Advanced Settings</span>
                                        <svg
                                            className="h-4 w-4 transition-transform duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </Collapsible.Trigger>
                                    <Collapsible.Panel>
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-700 space-y-3">
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

                            <div className="bg-gradient-to-br from-white via-neutral-50/30 to-white dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                                    Scroll Area
                                </h3>
                                <ScrollArea.Root className="h-48 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                    <ScrollArea.Viewport className="h-full p-4">
                                        <div className="space-y-3">
                                            {Array.from({ length: 20 }, (_, i) => (
                                                <div key={i} className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded">
                                                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                                        Item {i + 1}
                                                    </div>
                                                    <div className="text-sm text-neutral-600 dark:text-neutral-300">
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
                <div className="text-center mt-32 pt-16 border-t border-neutral-200/60 dark:border-neutral-700/60">
                    <div className="space-y-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 border border-neutral-200/50 dark:border-neutral-700/50">
                            <svg
                                className="w-6 h-6 text-neutral-600 dark:text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
                                Crafted with precision and care
                            </p>
                            <p className="text-neutral-500 dark:text-neutral-400">
                                Built using TanStack Start, Base UI, and Tailwind CSS
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Components */}
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md">
                        <Dialog.Title className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Example Dialog
                        </Dialog.Title>
                        <Dialog.Description className="text-neutral-600 dark:text-neutral-400 mb-6">
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
                    <AlertDialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md">
                        <AlertDialog.Title className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Are you sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-neutral-600 dark:text-neutral-400 mb-6">
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
