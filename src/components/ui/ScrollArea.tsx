import * as React from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area";
import { twMerge } from "tailwind-merge";

/**
 * ScrollArea Component
 *
 * A native scroll container with custom scrollbars, perfect for creating
 * consistent scrolling experiences across different operating systems and browsers.
 *
 * @example
 * ```jsx
 * import { ScrollArea } from '@/components/ui/ScrollArea'
 *
 * // Basic scroll area with content
 * <ScrollArea.Root className="h-48 w-64 border rounded">
 *   <ScrollArea.Viewport>
 *     <ScrollArea.Content className="p-4">
 *       <div className="space-y-4">
 *         {Array.from({ length: 20 }, (_, i) => (
 *           <div key={i} className="p-3 bg-gray-100 rounded">
 *             Item {i + 1}
 *           </div>
 *         ))}
 *       </div>
 *     </ScrollArea.Content>
 *   </ScrollArea.Viewport>
 *   <ScrollArea.Scrollbar>
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 * </ScrollArea.Root>
 *
 * // Chat messages scroll area
 * <div className="flex flex-col h-96 border rounded-lg">
 *   <div className="p-4 border-b bg-gray-50">
 *     <h3 className="font-semibold">Team Chat</h3>
 *   </div>
 *
 *   <ScrollArea.Root className="flex-1">
 *     <ScrollArea.Viewport>
 *       <ScrollArea.Content className="p-4 space-y-3">
 *         {messages.map((message) => (
 *           <div key={message.id} className="flex gap-3">
 *             <img
 *               src={message.avatar}
 *               alt={message.user}
 *               className="w-8 h-8 rounded-full"
 *             />
 *             <div>
 *               <div className="flex items-center gap-2">
 *                 <span className="font-medium text-sm">{message.user}</span>
 *                 <span className="text-xs text-gray-500">{message.time}</span>
 *               </div>
 *               <p className="text-sm">{message.content}</p>
 *             </div>
 *           </div>
 *         ))}
 *       </ScrollArea.Content>
 *     </ScrollArea.Viewport>
 *     <ScrollArea.Scrollbar>
 *       <ScrollArea.Thumb />
 *     </ScrollArea.Scrollbar>
 *   </ScrollArea.Root>
 *
 *   <div className="p-4 border-t">
 *     <input
 *       type="text"
 *       placeholder="Type a message..."
 *       className="w-full p-2 border rounded"
 *     />
 *   </div>
 * </div>
 *
 * // Code editor with horizontal scroll
 * <ScrollArea.Root className="h-64 w-full border rounded-lg bg-gray-900 text-white">
 *   <ScrollArea.Viewport>
 *     <ScrollArea.Content className="p-4">
 *       <pre className="text-sm font-mono">
 *         <code>{`
 * function calculateComplexValue(data, options = {}) {
 *   const { threshold = 0.5, multiplier = 1.2, enableFeatureX = true } = options;
 *
 *   return data
 *     .filter(item => item.value > threshold)
 *     .map(item => ({
 *       ...item,
 *       calculated: item.value * multiplier,
 *       processed: enableFeatureX ? processFeatureX(item) : item
 *     }))
 *     .reduce((acc, item) => acc + item.calculated, 0);
 * }
 *         `}</code>
 *       </pre>
 *     </ScrollArea.Content>
 *   </ScrollArea.Viewport>
 *   <ScrollArea.Scrollbar orientation="vertical">
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 *   <ScrollArea.Scrollbar orientation="horizontal">
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 *   <ScrollArea.Corner />
 * </ScrollArea.Root>
 *
 * // File browser sidebar
 * <div className="flex h-96 border rounded-lg overflow-hidden">
 *   <ScrollArea.Root className="w-64 border-r bg-gray-50">
 *     <ScrollArea.Viewport>
 *       <ScrollArea.Content className="p-2">
 *         <div className="space-y-1">
 *           <div className="font-medium text-sm p-2">Project Files</div>
 *           {fileTree.map((item) => (
 *             <div
 *               key={item.path}
 *               className="flex items-center gap-2 p-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
 *               style={{ paddingLeft: `${item.depth * 12 + 8}px` }}
 *             >
 *               <span>{item.type === 'folder' ? '📁' : '📄'}</span>
 *               <span>{item.name}</span>
 *             </div>
 *           ))}
 *         </div>
 *       </ScrollArea.Content>
 *     </ScrollArea.Viewport>
 *     <ScrollArea.Scrollbar>
 *       <ScrollArea.Thumb />
 *     </ScrollArea.Scrollbar>
 *   </ScrollArea.Root>
 *
 *   <div className="flex-1 p-4">
 *     <h3 className="font-semibold mb-2">File Content</h3>
 *     <p className="text-gray-600">Select a file to view its content</p>
 *   </div>
 * </div>
 *
 * // Data table with fixed header
 * <div className="border rounded-lg overflow-hidden">
 *   <div className="bg-gray-50 border-b">
 *     <div className="grid grid-cols-4 gap-4 p-3 font-medium text-sm">
 *       <div>Name</div>
 *       <div>Email</div>
 *       <div>Role</div>
 *       <div>Status</div>
 *     </div>
 *   </div>
 *
 *   <ScrollArea.Root className="h-64">
 *     <ScrollArea.Viewport>
 *       <ScrollArea.Content>
 *         {users.map((user) => (
 *           <div key={user.id} className="grid grid-cols-4 gap-4 p-3 border-b text-sm hover:bg-gray-50">
 *             <div className="font-medium">{user.name}</div>
 *             <div className="text-gray-600">{user.email}</div>
 *             <div>{user.role}</div>
 *             <div>
 *               <span className={`px-2 py-1 rounded text-xs ${
 *                 user.status === 'active' ? 'bg-green-100 text-green-800' :
 *                 user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
 *                 'bg-red-100 text-red-800'
 *               }`}>
 *                 {user.status}
 *               </span>
 *             </div>
 *           </div>
 *         ))}
 *       </ScrollArea.Content>
 *     </ScrollArea.Viewport>
 *     <ScrollArea.Scrollbar>
 *       <ScrollArea.Thumb />
 *     </ScrollArea.Scrollbar>
 *   </ScrollArea.Root>
 * </div>
 *
 * // Notification list
 * <ScrollArea.Root className="h-80 w-80 border rounded-lg bg-white shadow-lg">
 *   <ScrollArea.Viewport>
 *     <ScrollArea.Content>
 *       <div className="p-4 border-b">
 *         <h3 className="font-semibold">Notifications</h3>
 *       </div>
 *
 *       <div className="divide-y">
 *         {notifications.map((notification) => (
 *           <div key={notification.id} className="p-4 hover:bg-gray-50">
 *             <div className="flex gap-3">
 *               <div className={`w-2 h-2 rounded-full mt-2 ${
 *                 notification.unread ? 'bg-blue-500' : 'bg-gray-300'
 *               }`} />
 *               <div className="flex-1">
 *                 <p className="text-sm font-medium">{notification.title}</p>
 *                 <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
 *                 <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
 *               </div>
 *             </div>
 *           </div>
 *         ))}
 *       </div>
 *     </ScrollArea.Content>
 *   </ScrollArea.Viewport>
 *   <ScrollArea.Scrollbar>
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 * </ScrollArea.Root>
 *
 * // Gallery with horizontal scroll
 * <ScrollArea.Root className="w-full">
 *   <ScrollArea.Viewport>
 *     <ScrollArea.Content className="flex gap-4 p-4">
 *       {gallery.map((image) => (
 *         <div key={image.id} className="flex-none w-48">
 *           <img
 *             src={image.src}
 *             alt={image.alt}
 *             className="w-full h-32 object-cover rounded"
 *           />
 *           <p className="text-sm mt-2">{image.title}</p>
 *         </div>
 *       ))}
 *     </ScrollArea.Content>
 *   </ScrollArea.Viewport>
 *   <ScrollArea.Scrollbar orientation="horizontal">
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 * </ScrollArea.Root>
 *
 * // Settings panel with nested scroll areas
 * <div className="h-96 w-80 border rounded-lg bg-white">
 *   <div className="p-4 border-b">
 *     <h3 className="font-semibold">Settings</h3>
 *   </div>
 *
 *   <ScrollArea.Root className="flex-1">
 *     <ScrollArea.Viewport>
 *       <ScrollArea.Content className="p-4 space-y-6">
 *         <div>
 *           <h4 className="font-medium mb-3">Account</h4>
 *           <div className="space-y-2">
 *             <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
 *               Profile Settings
 *             </button>
 *             <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
 *               Security
 *             </button>
 *             <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
 *               Billing
 *             </button>
 *           </div>
 *         </div>
 *
 *         <div>
 *           <h4 className="font-medium mb-3">Preferences</h4>
 *           <div className="space-y-2">
 *             <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
 *               Notifications
 *             </button>
 *             <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
 *               Privacy
 *             </button>
 *             <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
 *               Appearance
 *             </button>
 *           </div>
 *         </div>
 *       </ScrollArea.Content>
 *     </ScrollArea.Viewport>
 *     <ScrollArea.Scrollbar>
 *       <ScrollArea.Thumb />
 *     </ScrollArea.Scrollbar>
 *   </ScrollArea.Root>
 * </div>
 * ```
 */

interface ScrollAreaRootProps extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root> {
    className?: string;
}

const ScrollAreaRoot = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(({ className, ...props }, ref) => {
    return <BaseScrollArea.Root ref={ref} className={twMerge("relative overflow-hidden", className)} {...props} />;
});
ScrollAreaRoot.displayName = "ScrollArea.Root";

interface ScrollAreaViewportProps extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport> {
    className?: string;
}

const ScrollAreaViewport = React.forwardRef<HTMLDivElement, ScrollAreaViewportProps>(({ className, ...props }, ref) => {
    return (
        <BaseScrollArea.Viewport
            ref={ref}
            className={twMerge("h-full w-full rounded-[inherit]", className)}
            {...props}
        />
    );
});
ScrollAreaViewport.displayName = "ScrollArea.Viewport";

interface ScrollAreaContentProps extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Content> {
    className?: string;
}

const ScrollAreaContent = React.forwardRef<HTMLDivElement, ScrollAreaContentProps>(({ className, ...props }, ref) => {
    return <BaseScrollArea.Content ref={ref} className={className} {...props} />;
});
ScrollAreaContent.displayName = "ScrollArea.Content";

interface ScrollAreaScrollbarProps extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar> {
    className?: string;
    orientation?: "vertical" | "horizontal";
}

const ScrollAreaScrollbar = React.forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
    ({ className, orientation = "vertical", ...props }, ref) => {
        return (
            <BaseScrollArea.Scrollbar
                ref={ref}
                orientation={orientation}
                className={twMerge(
                    "flex touch-none select-none transition-colors",
                    orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
                    orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "data-[hovering]:bg-gray-100 dark:data-[hovering]:bg-gray-800",
                    className,
                )}
                {...props}
            />
        );
    },
);
ScrollAreaScrollbar.displayName = "ScrollArea.Scrollbar";

interface ScrollAreaThumbProps extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb> {
    className?: string;
}

const ScrollAreaThumb = React.forwardRef<HTMLDivElement, ScrollAreaThumbProps>(({ className, ...props }, ref) => {
    return (
        <BaseScrollArea.Thumb
            ref={ref}
            className={twMerge(
                "relative flex-1 rounded-full bg-gray-300 transition-colors",
                "hover:bg-gray-400 active:bg-gray-500",
                "dark:bg-gray-600 dark:hover:bg-gray-500 dark:active:bg-gray-400",
                className,
            )}
            {...props}
        />
    );
});
ScrollAreaThumb.displayName = "ScrollArea.Thumb";

interface ScrollAreaCornerProps extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Corner> {
    className?: string;
}

const ScrollAreaCorner = React.forwardRef<HTMLDivElement, ScrollAreaCornerProps>(({ className, ...props }, ref) => {
    return (
        <BaseScrollArea.Corner ref={ref} className={twMerge("bg-gray-100 dark:bg-gray-800", className)} {...props} />
    );
});
ScrollAreaCorner.displayName = "ScrollArea.Corner";

export const ScrollArea = {
    Root: ScrollAreaRoot,
    Viewport: ScrollAreaViewport,
    Content: ScrollAreaContent,
    Scrollbar: ScrollAreaScrollbar,
    Thumb: ScrollAreaThumb,
    Corner: ScrollAreaCorner,
};
