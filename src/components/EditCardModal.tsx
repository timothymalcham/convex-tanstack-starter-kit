import { useState } from "react";
import { Dialog } from "./ui/Dialog";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { RichTextEditor } from "./ui/RichTextEditor";
import { useUpdateCardMutation } from "../queries";
import type { RenderedItem } from "../types";

interface EditCardModalProps {
  card: RenderedItem;
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
}

/**
 * Enhanced card editing modal with rich text support
 * 
 * Features:
 * - Title editing
 * - Rich text content editing with Tiptap
 * - Save/cancel actions
 * 
 * @example
 * ```tsx
 * <EditCardModal
 *   card={cardData}
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   boardId="board-123"
 * />
 * ```
 */
export function EditCardModal({ card, isOpen, onClose, boardId }: EditCardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [content, setContent] = useState(card.content || "");
  const [isSaving, setIsSaving] = useState(false);
  
  const updateCard = useUpdateCardMutation();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateCard.mutateAsync({
        id: card.id,
        title,
        content,
        order: card.order,
        columnId: card.columnId,
        boardId,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update card:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setTitle(card.title);
    setContent(card.content || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <Dialog.Header>
          <Dialog.Title>Edit Card</Dialog.Title>
          <Dialog.Description>
            Update the card title and content using rich text formatting.
          </Dialog.Description>
        </Dialog.Header>

        <div className="space-y-4 py-4">
          {/* Title Input */}
          <div>
            <label htmlFor="card-title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              id="card-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
              className="w-full"
            />
          </div>

          {/* Rich Text Content Editor */}
          <div>
            <label htmlFor="card-content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Add detailed description, notes, or formatting..."
              className="w-full"
            />
          </div>
        </div>

        <Dialog.Footer>
          <Button
            variant="ghost"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="ml-2"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}