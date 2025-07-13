import { forwardRef, useState } from "react";
import invariant from "tiny-invariant";
import { deleteItemSchema } from "../db/schema";
import { Icon } from "../icons/icons";
import { useDeleteCardMutation, useUpdateCardMutation } from "../queries";
import { CONTENT_TYPES } from "../types";
import { RichTextViewer } from "./ui/RichTextEditor";
import { EditCardModal } from "./EditCardModal";

interface CardProps {
    title: string;
    content: string | null;
    id: string;
    columnId: string;
    boardId: string;
    order: number;
    nextOrder: number;
    previousOrder: number;
}

export const Card = forwardRef<HTMLLIElement, CardProps>(
    ({ title, content, id, columnId, boardId, order, nextOrder, previousOrder }, ref) => {
        const [acceptDrop, setAcceptDrop] = useState<"none" | "top" | "bottom">("none");
        const [showEditModal, setShowEditModal] = useState(false);

        const deleteCard = useDeleteCardMutation();
        const moveCard = useUpdateCardMutation();

        return (
            <li
                ref={ref}
                onDragOver={(event) => {
                    if (event.dataTransfer.types.includes(CONTENT_TYPES.card)) {
                        event.preventDefault();
                        event.stopPropagation();
                        const rect = event.currentTarget.getBoundingClientRect();
                        const midpoint = (rect.top + rect.bottom) / 2;
                        setAcceptDrop(event.clientY <= midpoint ? "top" : "bottom");
                    }
                }}
                onDragLeave={() => {
                    setAcceptDrop("none");
                }}
                onDrop={(event) => {
                    event.stopPropagation();

                    const transfer = JSON.parse(event.dataTransfer.getData(CONTENT_TYPES.card) || "null");

                    if (!transfer) {
                        return;
                    }

                    invariant(transfer.id, "missing cardId");
                    invariant(transfer.title, "missing title");

                    const droppedOrder = acceptDrop === "top" ? previousOrder : nextOrder;
                    const moveOrder = (droppedOrder + order) / 2;

                    moveCard.mutate({
                        order: moveOrder,
                        columnId,
                        boardId,
                        id: transfer.id,
                        title: transfer.title,
                    });

                    setAcceptDrop("none");
                }}
                className={
                    "border-t-2 border-b-2 -mb-[2px] last:mb-0 cursor-grab active:cursor-grabbing px-2 py-1 " +
                    (acceptDrop === "top"
                        ? "border-t-red-500 border-b-transparent"
                        : acceptDrop === "bottom"
                          ? "border-b-red-500 border-t-transparent"
                          : "border-t-transparent border-b-transparent")
                }
            >
                <div
                    draggable
                    className="bg-white shadow-sm shadow-slate-300 border-slate-300 text-sm rounded-lg w-full py-1 px-2 relative group"
                    onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData(CONTENT_TYPES.card, JSON.stringify({ id, title }));
                        event.stopPropagation();
                    }}
                >
                    <h3 className="font-medium">{title}</h3>
                    
                    {/* Rich text content display */}
                    <div className="mt-2 min-h-[20px]">
                        {content ? (
                            <RichTextViewer content={content} className="text-sm text-gray-600" />
                        ) : (
                            <div className="text-gray-400 text-xs italic">No content</div>
                        )}
                    </div>

                    {/* Action buttons - shown on hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                            aria-label="Edit card"
                            className="p-1 hover:text-blue-500 rounded text-xs font-bold"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowEditModal(true);
                            }}
                            type="button"
                        >
                            ✏️
                        </button>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                deleteCard.mutate(
                                    deleteItemSchema.parse({
                                        id,
                                        boardId,
                                    }),
                                );
                            }}
                        >
                            <button
                                aria-label="Delete card"
                                className="p-1 hover:text-red-500 rounded"
                                type="submit"
                            >
                                <Icon name="trash" />
                            </button>
                        </form>
                    </div>

                    {/* Order indicator */}
                    <div className="absolute bottom-1 right-1 opacity-30 text-xs">{order}</div>
                </div>

                {/* Edit Modal */}
                <EditCardModal
                    card={{ id, title, content: content || "", order, columnId }}
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    boardId={boardId}
                />
            </li>
        );
    },
);
