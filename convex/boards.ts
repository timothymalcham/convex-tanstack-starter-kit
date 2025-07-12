import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { 
  createBoardSchema, 
  updateBoardSchema, 
  createColumnSchema, 
  updateColumnSchema, 
  createCardSchema, 
  updateCardSchema,
  addBoardMemberSchema,
  createCardCommentSchema
} from "./schema";
import { getCurrentUserOrThrow } from "./users";
import type { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

// ====================
// BOARD QUERIES
// ====================

export const getUserBoards = query({
  args: {
    organizationId: v.optional(v.id("organizations")),
    includeArchived: v.optional(v.boolean()),
  },
  returns: v.array(v.object({
    _id: v.id("boards"),
    _creationTime: v.number(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
    createdBy: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    isArchived: v.optional(v.boolean()),
    isTemplate: v.optional(v.boolean()),
    visibility: v.union(
      v.literal("private"),
      v.literal("team"),
      v.literal("organization"),
      v.literal("public")
    ),
    tags: v.optional(v.array(v.string())),
    lastActivityAt: v.optional(v.number()),
    memberRole: v.optional(v.string()),
    isFavorite: v.boolean(),
  })),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    // Get boards where user is a member or owner
    const memberBoards = await ctx.db
      .query("boardMembers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const boardIds = memberBoards.map(m => m.boardId);
    
    // Get boards created by user
    let query = ctx.db
      .query("boards")
      .withIndex("by_createdBy", (q) => q.eq("createdBy", user._id));
    
    if (args.organizationId) {
      query = ctx.db
        .query("boards")
        .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId));
    }

    const createdBoards = await query.collect();
    
    // Combine and deduplicate boards
    const allBoardIds = new Set([...boardIds, ...createdBoards.map(b => b._id)]);
    const boards = await Promise.all(
      Array.from(allBoardIds).map(id => ctx.db.get(id))
    );

    // Filter out archived boards unless requested
    const filteredBoards = boards.filter(board => {
      if (!board) return false;
      if (!args.includeArchived && board.isArchived) return false;
      return true;
    });

    // Get user's favorites
    const favorites = await ctx.db
      .query("boardFavorites")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    
    const favoriteIds = new Set(favorites.map(f => f.boardId));

    // Add member role and favorite status
    const enrichedBoards = await Promise.all(
      filteredBoards.map(async (board) => {
        if (!board) return null;
        
        let memberRole = "owner";
        if (board.createdBy !== user._id) {
          const membership = memberBoards.find(m => m.boardId === board._id);
          memberRole = membership?.role || "viewer";
        }

        return {
          ...board,
          memberRole,
          isFavorite: favoriteIds.has(board._id),
        };
      })
    );

    return enrichedBoards.filter(Boolean);
  },
});

export const getBoard = query({
  args: { boardId: v.id("boards") },
  returns: v.object({
    _id: v.id("boards"),
    _creationTime: v.number(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
    createdBy: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    isArchived: v.optional(v.boolean()),
    visibility: v.union(
      v.literal("private"),
      v.literal("team"),
      v.literal("organization"),
      v.literal("public")
    ),
    tags: v.optional(v.array(v.string())),
    settings: v.optional(v.object({
      allowComments: v.optional(v.boolean()),
      allowAttachments: v.optional(v.boolean()),
      cardAutoArchive: v.optional(v.boolean()),
    })),
    lastActivityAt: v.optional(v.number()),
    columns: v.array(v.object({
      _id: v.id("columns"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.optional(v.string()),
      order: v.number(),
      color: v.optional(v.string()),
      isArchived: v.optional(v.boolean()),
      createdBy: v.id("users"),
      wipLimit: v.optional(v.number()),
    })),
    cards: v.array(v.object({
      _id: v.id("cards"),
      _creationTime: v.number(),
      title: v.string(),
      description: v.optional(v.string()),
      content: v.optional(v.string()),
      columnId: v.id("columns"),
      order: v.number(),
      createdBy: v.id("users"),
      assignedTo: v.optional(v.array(v.id("users"))),
      dueDate: v.optional(v.number()),
      priority: v.optional(v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent")
      )),
      status: v.optional(v.string()),
      labels: v.optional(v.array(v.string())),
      estimatedHours: v.optional(v.number()),
      actualHours: v.optional(v.number()),
      isArchived: v.optional(v.boolean()),
      coverImage: v.optional(v.string()),
      completedAt: v.optional(v.number()),
    })),
    memberRole: v.string(),
    isFavorite: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const board = await ctx.db.get(args.boardId);
    
    if (!board) {
      throw new Error("Board not found");
    }

    // Check access permissions
    if (board.visibility === "private" && board.createdBy !== user._id) {
      const membership = await ctx.db
        .query("boardMembers")
        .withIndex("by_boardAndUser", (q) => 
          q.eq("boardId", args.boardId).eq("userId", user._id)
        )
        .unique();
      
      if (!membership) {
        throw new Error("Access denied");
      }
    }

    // Get columns
    const columns = await ctx.db
      .query("columns")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();

    // Get cards
    const cards = await ctx.db
      .query("cards")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();

    // Get user's role
    let memberRole = "owner";
    if (board.createdBy !== user._id) {
      const membership = await ctx.db
        .query("boardMembers")
        .withIndex("by_boardAndUser", (q) => 
          q.eq("boardId", args.boardId).eq("userId", user._id)
        )
        .unique();
      memberRole = membership?.role || "viewer";
    }

    // Check if board is favorited
    const favorite = await ctx.db
      .query("boardFavorites")
      .withIndex("by_userAndBoard", (q) => 
        q.eq("userId", user._id).eq("boardId", args.boardId)
      )
      .unique();

    return {
      ...board,
      columns: columns.sort((a, b) => a.order - b.order),
      cards: cards.sort((a, b) => a.order - b.order),
      memberRole,
      isFavorite: !!favorite,
    };
  },
});

// ====================
// BOARD MUTATIONS
// ====================

export const createBoard = mutation({
  args: createBoardSchema,
  returns: v.id("boards"),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    const boardId = await ctx.db.insert("boards", {
      ...args,
      createdBy: user._id,
      lastActivityAt: Date.now(),
    });

    // Add creator as owner
    await ctx.db.insert("boardMembers", {
      boardId,
      userId: user._id,
      role: "owner",
      addedBy: user._id,
      addedAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId,
      userId: user._id,
      action: "created_board",
      entityType: "board",
      entityId: boardId,
      details: { title: args.name },
    });

    return boardId;
  },
});

export const updateBoard = mutation({
  args: { boardId: v.id("boards"), ...updateBoardSchema.fields },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const { boardId, ...updates } = args;
    
    const board = await ctx.db.get(boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    // Check permissions
    if (board.createdBy !== user._id) {
      const membership = await ctx.db
        .query("boardMembers")
        .withIndex("by_boardAndUser", (q) => 
          q.eq("boardId", boardId).eq("userId", user._id)
        )
        .unique();
      
      if (!membership || (membership.role !== "admin" && membership.role !== "owner")) {
        throw new Error("Access denied");
      }
    }

    await ctx.db.patch(boardId, {
      ...updates,
      lastActivityAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId,
      userId: user._id,
      action: "updated_board",
      entityType: "board",
      entityId: boardId,
      details: { title: board.name },
    });

    return null;
  },
});

export const archiveBoard = mutation({
  args: { boardId: v.id("boards") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const board = await ctx.db.get(args.boardId);
    
    if (!board) {
      throw new Error("Board not found");
    }

    // Check permissions (only owner can archive)
    if (board.createdBy !== user._id) {
      throw new Error("Only board owner can archive board");
    }

    await ctx.db.patch(args.boardId, {
      isArchived: true,
      lastActivityAt: Date.now(),
    });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId: args.boardId,
      userId: user._id,
      action: "archived_board",
      entityType: "board",
      entityId: args.boardId,
      details: { title: board.name },
    });

    return null;
  },
});

export const toggleBoardFavorite = mutation({
  args: { boardId: v.id("boards") },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    const existing = await ctx.db
      .query("boardFavorites")
      .withIndex("by_userAndBoard", (q) => 
        q.eq("userId", user._id).eq("boardId", args.boardId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("boardFavorites", {
        boardId: args.boardId,
        userId: user._id,
      });
      return true;
    }
  },
});

// ====================
// COLUMN MUTATIONS
// ====================

export const createColumn = mutation({
  args: createColumnSchema,
  returns: v.id("columns"),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    // Check board access
    const board = await ctx.db.get(args.boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    // Get next order
    const columns = await ctx.db
      .query("columns")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();
    
    const nextOrder = Math.max(...columns.map(c => c.order), 0) + 1;

    const columnId = await ctx.db.insert("columns", {
      ...args,
      order: nextOrder,
      createdBy: user._id,
    });

    // Update board activity
    await ctx.db.patch(args.boardId, { lastActivityAt: Date.now() });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId: args.boardId,
      userId: user._id,
      action: "created_column",
      entityType: "column",
      entityId: columnId,
      details: { title: args.name },
    });

    return columnId;
  },
});

export const updateColumn = mutation({
  args: { columnId: v.id("columns"), ...updateColumnSchema.fields },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const { columnId, ...updates } = args;
    
    const column = await ctx.db.get(columnId);
    if (!column) {
      throw new Error("Column not found");
    }

    await ctx.db.patch(columnId, updates);

    // Update board activity
    await ctx.db.patch(column.boardId, { lastActivityAt: Date.now() });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId: column.boardId,
      userId: user._id,
      action: "updated_column",
      entityType: "column",
      entityId: columnId,
      details: { title: column.name },
    });

    return null;
  },
});

// ====================
// CARD MUTATIONS
// ====================

export const createCard = mutation({
  args: createCardSchema,
  returns: v.id("cards"),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    // Get next order in column
    const cards = await ctx.db
      .query("cards")
      .withIndex("by_column", (q) => q.eq("columnId", args.columnId))
      .collect();
    
    const nextOrder = Math.max(...cards.map(c => c.order), 0) + 1;

    const cardId = await ctx.db.insert("cards", {
      ...args,
      order: nextOrder,
      createdBy: user._id,
    });

    // Update board activity
    await ctx.db.patch(args.boardId, { lastActivityAt: Date.now() });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId: args.boardId,
      userId: user._id,
      action: "created_card",
      entityType: "card",
      entityId: cardId,
      details: { title: args.title },
    });

    return cardId;
  },
});

export const updateCard = mutation({
  args: { cardId: v.id("cards"), ...updateCardSchema.fields },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const { cardId, ...updates } = args;
    
    const card = await ctx.db.get(cardId);
    if (!card) {
      throw new Error("Card not found");
    }

    await ctx.db.patch(cardId, updates);

    // Update board activity
    await ctx.db.patch(card.boardId, { lastActivityAt: Date.now() });

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId: card.boardId,
      userId: user._id,
      action: "updated_card",
      entityType: "card",
      entityId: cardId,
      details: { title: card.title },
    });

    return null;
  },
});

// ====================
// BOARD TEMPLATES
// ====================

export const getBoardTemplates = query({
  args: { category: v.optional(v.string()) },
  returns: v.array(v.object({
    _id: v.id("boards"),
    _creationTime: v.number(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
    templateCategory: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    createdBy: v.id("users"),
    columnsCount: v.number(),
    cardsCount: v.number(),
  })),
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("boards")
      .withIndex("by_isTemplate", (q) => q.eq("isTemplate", true));

    if (args.category) {
      query = ctx.db
        .query("boards")
        .withIndex("by_templateCategory", (q) => q.eq("templateCategory", args.category));
    }

    const templates = await query.collect();

    // Get column and card counts for each template
    const enrichedTemplates = await Promise.all(
      templates.map(async (template) => {
        const [columns, cards] = await Promise.all([
          ctx.db
            .query("columns")
            .withIndex("by_board", (q) => q.eq("boardId", template._id))
            .collect(),
          ctx.db
            .query("cards")
            .withIndex("by_board", (q) => q.eq("boardId", template._id))
            .collect(),
        ]);

        return {
          ...template,
          columnsCount: columns.length,
          cardsCount: cards.length,
        };
      })
    );

    return enrichedTemplates;
  },
});

export const getTemplateCategories = query({
  args: {},
  returns: v.array(v.object({
    category: v.string(),
    count: v.number(),
    description: v.optional(v.string()),
  })),
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("boards")
      .withIndex("by_isTemplate", (q) => q.eq("isTemplate", true))
      .collect();

    // Count templates by category
    const categoryMap = new Map<string, number>();
    templates.forEach(template => {
      const category = template.templateCategory || "General";
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    // Define category descriptions
    const categoryDescriptions: Record<string, string> = {
      "Project Management": "Templates for managing projects and tasks",
      "Software Development": "Templates for development workflows and sprints",
      "Marketing": "Templates for marketing campaigns and content planning",
      "Sales": "Templates for sales processes and pipeline management",
      "HR": "Templates for hiring, onboarding, and HR processes",
      "Personal": "Templates for personal productivity and organization",
      "Education": "Templates for educational and learning management",
      "General": "General purpose templates",
    };

    return Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count,
      description: categoryDescriptions[category],
    }));
  },
});

export const createBoardFromTemplate = mutation({
  args: {
    templateId: v.id("boards"),
    name: v.string(),
    organizationId: v.optional(v.id("organizations")),
  },
  returns: v.id("boards"),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const template = await ctx.db.get(args.templateId);

    if (!template || !template.isTemplate) {
      throw new Error("Template not found");
    }

    // Create new board from template
    const boardId = await ctx.db.insert("boards", {
      name: args.name,
      description: template.description,
      color: template.color,
      createdBy: user._id,
      organizationId: args.organizationId,
      visibility: "private",
      tags: template.tags,
      settings: template.settings,
      lastActivityAt: Date.now(),
    });

    // Add creator as owner
    await ctx.db.insert("boardMembers", {
      boardId,
      userId: user._id,
      role: "owner",
      addedBy: user._id,
      addedAt: Date.now(),
    });

    // Copy columns from template
    const templateColumns = await ctx.db
      .query("columns")
      .withIndex("by_board", (q) => q.eq("boardId", args.templateId))
      .collect();

    const columnIdMap = new Map<Id<"columns">, Id<"columns">>();

    for (const templateColumn of templateColumns.sort((a, b) => a.order - b.order)) {
      const newColumnId = await ctx.db.insert("columns", {
        boardId,
        name: templateColumn.name,
        description: templateColumn.description,
        order: templateColumn.order,
        color: templateColumn.color,
        createdBy: user._id,
        wipLimit: templateColumn.wipLimit,
        settings: templateColumn.settings,
      });
      columnIdMap.set(templateColumn._id, newColumnId);
    }

    // Copy cards from template
    const templateCards = await ctx.db
      .query("cards")
      .withIndex("by_board", (q) => q.eq("boardId", args.templateId))
      .collect();

    for (const templateCard of templateCards.sort((a, b) => a.order - b.order)) {
      const newColumnId = columnIdMap.get(templateCard.columnId);
      if (newColumnId) {
        await ctx.db.insert("cards", {
          title: templateCard.title,
          description: templateCard.description,
          content: templateCard.content,
          boardId,
          columnId: newColumnId,
          order: templateCard.order,
          createdBy: user._id,
          priority: templateCard.priority,
          labels: templateCard.labels,
          estimatedHours: templateCard.estimatedHours,
        });
      }
    }

    // Log activity
    await ctx.db.insert("boardActivities", {
      boardId,
      userId: user._id,
      action: "created_from_template",
      entityType: "board",
      entityId: boardId,
      details: { 
        title: args.name,
        from: template.name,
      },
    });

    return boardId;
  },
});

export const convertBoardToTemplate = mutation({
  args: {
    boardId: v.id("boards"),
    templateName: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
  },
  returns: v.id("boards"),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const sourceBoard = await ctx.db.get(args.boardId);

    if (!sourceBoard) {
      throw new Error("Board not found");
    }

    // Check permissions (only owner can convert to template)
    if (sourceBoard.createdBy !== user._id) {
      throw new Error("Only board owner can convert to template");
    }

    // Create template board
    const templateId = await ctx.db.insert("boards", {
      name: args.templateName,
      description: args.description || sourceBoard.description,
      color: sourceBoard.color,
      createdBy: user._id,
      isTemplate: true,
      templateCategory: args.category,
      visibility: "public",
      tags: sourceBoard.tags,
      settings: sourceBoard.settings,
      lastActivityAt: Date.now(),
    });

    // Copy columns
    const sourceColumns = await ctx.db
      .query("columns")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();

    const columnIdMap = new Map<Id<"columns">, Id<"columns">>();

    for (const column of sourceColumns.sort((a, b) => a.order - b.order)) {
      const newColumnId = await ctx.db.insert("columns", {
        boardId: templateId,
        name: column.name,
        description: column.description,
        order: column.order,
        color: column.color,
        createdBy: user._id,
        wipLimit: column.wipLimit,
        settings: column.settings,
      });
      columnIdMap.set(column._id, newColumnId);
    }

    // Copy sample cards (limited to avoid clutter in templates)
    const sourceCards = await ctx.db
      .query("cards")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();

    // Only copy a few sample cards per column
    const cardsByColumn = new Map<Id<"columns">, typeof sourceCards>();
    sourceCards.forEach(card => {
      if (!cardsByColumn.has(card.columnId)) {
        cardsByColumn.set(card.columnId, []);
      }
      cardsByColumn.get(card.columnId)!.push(card);
    });

    for (const [oldColumnId, cards] of cardsByColumn.entries()) {
      const newColumnId = columnIdMap.get(oldColumnId);
      if (newColumnId) {
        // Take only first 2 cards as samples
        const sampleCards = cards.slice(0, 2);
        for (const card of sampleCards) {
          await ctx.db.insert("cards", {
            title: card.title,
            description: card.description,
            content: card.content,
            boardId: templateId,
            columnId: newColumnId,
            order: card.order,
            createdBy: user._id,
            priority: card.priority,
            labels: card.labels,
          });
        }
      }
    }

    return templateId;
  },
});

// ====================
// BOARD SHARING & COLLABORATION
// ====================

export const getBoardMembers = query({
  args: { boardId: v.id("boards") },
  returns: v.array(v.object({
    _id: v.id("boardMembers"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    permissions: v.optional(v.array(v.string())),
    addedBy: v.id("users"),
    addedAt: v.number(),
    user: v.object({
      _id: v.id("users"),
      name: v.optional(v.string()),
      email: v.string(),
      image: v.optional(v.string()),
    }),
    addedByUser: v.object({
      _id: v.id("users"),
      name: v.optional(v.string()),
      email: v.string(),
    }),
  })),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    // Check if user has access to board
    const board = await ctx.db.get(args.boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    // Get all board members
    const members = await ctx.db
      .query("boardMembers")
      .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
      .collect();

    // Get user details for each member
    const enrichedMembers = await Promise.all(
      members.map(async (member) => {
        const [memberUser, addedByUser] = await Promise.all([
          ctx.db.get(member.userId),
          ctx.db.get(member.addedBy),
        ]);

        if (!memberUser || !addedByUser) {
          throw new Error("User not found");
        }

        return {
          ...member,
          user: {
            _id: memberUser._id,
            name: memberUser.name,
            email: memberUser.email,
            image: memberUser.image,
          },
          addedByUser: {
            _id: addedByUser._id,
            name: addedByUser.name,
            email: addedByUser.email,
          },
        };
      })
    );

    return enrichedMembers;
  },
});

export const addBoardMember = mutation({
  args: addBoardMemberSchema,
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const board = await ctx.db.get(args.boardId);
    
    if (!board) {
      throw new Error("Board not found");
    }

    // Check if user has permission to add members
    if (board.createdBy !== user._id) {
      const membership = await ctx.db
        .query("boardMembers")
        .withIndex("by_boardAndUser", (q) => 
          q.eq("boardId", args.boardId).eq("userId", user._id)
        )
        .unique();
      
      if (!membership || (membership.role !== "admin" && membership.role !== "owner")) {
        throw new Error("Access denied: Cannot add members");
      }
    }

    // Check if user is already a member
    const existing = await ctx.db
      .query("boardMembers")
      .withIndex("by_boardAndUser", (q) => 
        q.eq("boardId", args.boardId).eq("userId", args.userId)
      )
      .unique();

    if (existing) {
      throw new Error("User is already a member of this board");
    }

    // Add member
    await ctx.db.insert("boardMembers", {
      ...args,
      addedBy: user._id,
      addedAt: Date.now(),
    });

    // Update board activity
    await ctx.db.patch(args.boardId, { lastActivityAt: Date.now() });

    // Log activity
    const newMember = await ctx.db.get(args.userId);
    await ctx.db.insert("boardActivities", {
      boardId: args.boardId,
      userId: user._id,
      action: "added_member",
      entityType: "member",
      entityId: args.userId,
      details: { 
        title: newMember?.name || newMember?.email || "Unknown user",
        to: args.role,
      },
    });

    return null;
  },
});

export const updateBoardMemberRole = mutation({
  args: {
    boardId: v.id("boards"),
    userId: v.id("users"),
    role: v.union(
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const board = await ctx.db.get(args.boardId);
    
    if (!board) {
      throw new Error("Board not found");
    }

    // Check permissions
    if (board.createdBy !== user._id) {
      const membership = await ctx.db
        .query("boardMembers")
        .withIndex("by_boardAndUser", (q) => 
          q.eq("boardId", args.boardId).eq("userId", user._id)
        )
        .unique();
      
      if (!membership || membership.role !== "admin") {
        throw new Error("Access denied: Cannot update member roles");
      }
    }

    // Find member
    const member = await ctx.db
      .query("boardMembers")
      .withIndex("by_boardAndUser", (q) => 
        q.eq("boardId", args.boardId).eq("userId", args.userId)
      )
      .unique();

    if (!member) {
      throw new Error("Member not found");
    }

    // Cannot change owner role
    if (member.role === "owner") {
      throw new Error("Cannot change owner role");
    }

    // Update role
    await ctx.db.patch(member._id, { role: args.role });

    // Update board activity
    await ctx.db.patch(args.boardId, { lastActivityAt: Date.now() });

    // Log activity
    const updatedUser = await ctx.db.get(args.userId);
    await ctx.db.insert("boardActivities", {
      boardId: args.boardId,
      userId: user._id,
      action: "updated_member_role",
      entityType: "member",
      entityId: args.userId,
      details: { 
        title: updatedUser?.name || updatedUser?.email || "Unknown user",
        from: member.role,
        to: args.role,
      },
    });

    return null;
  },
});

export const removeBoardMember = mutation({
  args: {
    boardId: v.id("boards"),
    userId: v.id("users"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const board = await ctx.db.get(args.boardId);
    
    if (!board) {
      throw new Error("Board not found");
    }

    // Check permissions
    const isOwner = board.createdBy === user._id;
    const isSelfRemoval = args.userId === user._id;
    
    if (!isOwner && !isSelfRemoval) {
      const membership = await ctx.db
        .query("boardMembers")
        .withIndex("by_boardAndUser", (q) => 
          q.eq("boardId", args.boardId).eq("userId", user._id)
        )
        .unique();
      
      if (!membership || membership.role !== "admin") {
        throw new Error("Access denied: Cannot remove members");
      }
    }

    // Find member
    const member = await ctx.db
      .query("boardMembers")
      .withIndex("by_boardAndUser", (q) => 
        q.eq("boardId", args.boardId).eq("userId", args.userId)
      )
      .unique();

    if (!member) {
      throw new Error("Member not found");
    }

    // Cannot remove owner
    if (member.role === "owner") {
      throw new Error("Cannot remove board owner");
    }

    // Remove member
    await ctx.db.delete(member._id);

    // Remove from favorites if applicable
    const favorite = await ctx.db
      .query("boardFavorites")
      .withIndex("by_userAndBoard", (q) => 
        q.eq("userId", args.userId).eq("boardId", args.boardId)
      )
      .unique();
    
    if (favorite) {
      await ctx.db.delete(favorite._id);
    }

    // Update board activity
    await ctx.db.patch(args.boardId, { lastActivityAt: Date.now() });

    // Log activity
    const removedUser = await ctx.db.get(args.userId);
    await ctx.db.insert("boardActivities", {
      boardId: args.boardId,
      userId: user._id,
      action: isSelfRemoval ? "left_board" : "removed_member",
      entityType: "member",
      entityId: args.userId,
      details: { 
        title: removedUser?.name || removedUser?.email || "Unknown user",
        from: member.role,
      },
    });

    return null;
  },
});

export const getBoardActivity = query({
  args: { 
    boardId: v.id("boards"),
    limit: v.optional(v.number()),
  },
  returns: v.array(v.object({
    _id: v.id("boardActivities"),
    _creationTime: v.number(),
    action: v.string(),
    entityType: v.union(
      v.literal("board"),
      v.literal("column"),
      v.literal("card"),
      v.literal("comment"),
      v.literal("member")
    ),
    entityId: v.optional(v.string()),
    details: v.optional(v.object({
      from: v.optional(v.string()),
      to: v.optional(v.string()),
      title: v.optional(v.string()),
    })),
    user: v.object({
      _id: v.id("users"),
      name: v.optional(v.string()),
      email: v.string(),
      image: v.optional(v.string()),
    }),
  })),
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    // Check board access
    const board = await ctx.db.get(args.boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    const activities = await ctx.db
      .query("boardActivities")
      .withIndex("by_boardAndTime", (q) => q.eq("boardId", args.boardId))
      .order("desc")
      .take(args.limit || 50);

    // Get user details for each activity
    const enrichedActivities = await Promise.all(
      activities.map(async (activity) => {
        const activityUser = await ctx.db.get(activity.userId);
        
        if (!activityUser) {
          throw new Error("User not found");
        }

        return {
          ...activity,
          user: {
            _id: activityUser._id,
            name: activityUser.name,
            email: activityUser.email,
            image: activityUser.image,
          },
        };
      })
    );

    return enrichedActivities;
  },
});


// ====================
// TEMPLATE MANAGEMENT
// ====================

export const getTemplateCategories = query({
  args: {},
  returns: v.array(v.object({
    category: v.string(),
    count: v.number(),
    templates: v.array(v.object({
      _id: v.id("boards"),
      name: v.string(),
      description: v.optional(v.string()),
      color: v.string(),
      templateCategory: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
      columnCount: v.number(),
    })),
  })),
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("boards")
      .withIndex("by_isTemplate", (q) => q.eq("isTemplate", true))
      .collect();

    // Group templates by category
    const categoryMap = new Map<string, typeof templates>();
    
    for (const template of templates) {
      const category = template.templateCategory || "Other";
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(template);
    }

    // Build response with column counts
    const categoriesWithCounts = await Promise.all(
      Array.from(categoryMap.entries()).map(async ([category, categoryTemplates]) => {
        const templatesWithColumnCounts = await Promise.all(
          categoryTemplates.map(async (template) => {
            const columns = await ctx.db
              .query("columns")
              .withIndex("by_board", (q) => q.eq("boardId", template._id))
              .collect();
            
            return {
              _id: template._id,
              name: template.name,
              description: template.description,
              color: template.color,
              templateCategory: template.templateCategory,
              tags: template.tags,
              columnCount: columns.length,
            };
          })
        );

        return {
          category,
          count: categoryTemplates.length,
          templates: templatesWithColumnCounts,
        };
      })
    );

    // Sort categories by name
    return categoriesWithCounts.sort((a, b) => a.category.localeCompare(b.category));
  },
});

export const seedTemplates = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);
    
    // Check if user is admin or first user
    const allUsers = await ctx.db.query("users").collect();
    const isFirstUser = allUsers.length === 1 && allUsers[0]._id === user._id;
    
    if (!isFirstUser) {
      throw new Error("Only the first user can seed templates");
    }

    // Check if templates already exist
    const existingTemplates = await ctx.db
      .query("boards")
      .withIndex("by_isTemplate", (q) => q.eq("isTemplate", true))
      .first();
    
    if (existingTemplates) {
      throw new Error("Templates already exist");
    }

    // Run the seeding
    await ctx.scheduler.runAfter(0, internal.boardTemplates.seedBoardTemplates, {});
    
    return null;
  },
});