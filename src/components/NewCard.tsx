import { useRef, useState } from "react";
import invariant from "tiny-invariant";
import { CancelButton } from "~/components/CancelButton";
import { SaveButton } from "~/components/SaveButton";
import { itemSchema } from "../db/schema";
import { useCreateItemMutation } from "../queries";
import { ItemMutationFields } from "../types";
import { RichTextEditor } from "./ui/RichTextEditor";
import { Button } from "./ui/Button";

export function NewCard({
    columnId,
    boardId,
    nextOrder,
    onComplete,
}: {
    columnId: string;
    boardId: string;
    nextOrder: number;
    onComplete: () => void;
}) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showRichEditor, setShowRichEditor] = useState(false);
    const { mutate } = useCreateItemMutation();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!title.trim()) return;

        const id = crypto.randomUUID();
        
        mutate(itemSchema.parse({
            id,
            title: title.trim(),
            content: content || undefined,
            order: nextOrder,
            columnId,
            boardId,
        }));

        // Reset form
        setTitle("");
        setContent("");
        setShowRichEditor(false);
        onComplete();
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setShowRichEditor(false);
        onComplete();
    };

    return (
        <form
            method="post"
            className="px-2 py-1 border-t-2 border-b-2 border-transparent"
            onSubmit={handleSubmit}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    handleCancel();
                }
            }}
        >
            <div className="bg-white shadow-sm shadow-slate-300 border-slate-300 text-sm rounded-lg w-full p-2 space-y-2">
                {/* Title Input */}
                <textarea
                    autoFocus
                    required
                    ref={textAreaRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for this card"
                    className="outline-hidden w-full py-1 px-2 resize-none placeholder:text-sm placeholder:text-slate-500 border-none text-sm font-medium"
                    rows={1}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            if (showRichEditor) {
                                // Focus rich editor or submit if content is ready
                                handleSubmit(event);
                            } else {
                                setShowRichEditor(true);
                            }
                        }
                        if (event.key === "Escape") {
                            handleCancel();
                        }
                    }}
                    onInput={(event) => {
                        const el = event.currentTarget;
                        el.style.height = 'auto';
                        el.style.height = `${el.scrollHeight}px`;
                    }}
                />

                {/* Rich Text Editor Toggle */}
                {!showRichEditor && (
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowRichEditor(true)}
                            className="text-xs"
                        >
                            Add description
                        </Button>
                    </div>
                )}

                {/* Rich Text Editor */}
                {showRichEditor && (
                    <div className="border-t pt-2">
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                            placeholder="Add a detailed description..."
                            className="min-h-[100px]"
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2">
                    <SaveButton 
                        ref={buttonRef}
                        disabled={!title.trim()}
                    >
                        Save Card
                    </SaveButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </div>
            </div>
        </form>
    );
}
