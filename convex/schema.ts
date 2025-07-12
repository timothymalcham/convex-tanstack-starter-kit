import { defineSchema, defineTable } from 'convex/server'
import { type Infer, v } from 'convex/values'
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  // Authentication tables from Convex Auth
  ...authTables,

  // ====================
  // USER MANAGEMENT
  // ====================
  
  // Extended user profile information
  userProfiles: defineTable({
    userId: v.id("users"),
    emailNotifications: v.optional(v.boolean()),
    marketingEmails: v.optional(v.boolean()),
    timezone: v.optional(v.string()),
    language: v.optional(v.string()),
    theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    location: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    dateOfBirth: v.optional(v.number()),
    onboardingCompleted: v.optional(v.boolean()),
    lastActiveAt: v.optional(v.number()),
  }).index('by_userId', ['userId'])
    .index('by_lastActive', ['lastActiveAt'])
    .index('by_onboardingCompleted', ['onboardingCompleted']),

  // ====================
  // ORGANIZATIONS & TEAMS
  // ====================
  
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    logo: v.optional(v.string()),
    industry: v.optional(v.string()),
    size: v.optional(v.union(
      v.literal("1-10"),
      v.literal("11-50"),
      v.literal("51-200"),
      v.literal("201-1000"),
      v.literal("1000+")
    )),
    settings: v.optional(v.object({
      allowInvites: v.optional(v.boolean()),
      requireApproval: v.optional(v.boolean()),
      defaultRole: v.optional(v.string()),
    })),
    createdBy: v.id("users"),
    isActive: v.optional(v.boolean()),
  }).index('by_slug', ['slug'])
    .index('by_createdBy', ['createdBy'])
    .index('by_isActive', ['isActive']),

  organizationMembers: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    status: v.union(
      v.literal("active"),
      v.literal("invited"),
      v.literal("suspended")
    ),
    joinedAt: v.optional(v.number()),
    invitedBy: v.optional(v.id("users")),
    invitedAt: v.optional(v.number()),
    permissions: v.optional(v.array(v.string())),
  }).index('by_organization', ['organizationId'])
    .index('by_user', ['userId'])
    .index('by_organizationAndUser', ['organizationId', 'userId'])
    .index('by_status', ['status'])
    .index('by_role', ['role']),

  teams: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    organizationId: v.id("organizations"),
    createdBy: v.id("users"),
    isPrivate: v.optional(v.boolean()),
    color: v.optional(v.string()),
    settings: v.optional(v.object({
      defaultPermissions: v.optional(v.array(v.string())),
    })),
  }).index('by_organization', ['organizationId'])
    .index('by_createdBy', ['createdBy'])
    .index('by_isPrivate', ['isPrivate']),

  teamMembers: defineTable({
    teamId: v.id("teams"),
    userId: v.id("users"),
    role: v.union(
      v.literal("lead"),
      v.literal("member")
    ),
    addedBy: v.id("users"),
    permissions: v.optional(v.array(v.string())),
  }).index('by_team', ['teamId'])
    .index('by_user', ['userId'])
    .index('by_teamAndUser', ['teamId', 'userId'])
    .index('by_addedBy', ['addedBy']),

  // ====================
  // BILLING & SUBSCRIPTIONS
  // ====================
  
  subscriptions: defineTable({
    organizationId: v.id("organizations"),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    stripePriceId: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("incomplete"),
      v.literal("incomplete_expired"),
      v.literal("past_due"),
      v.literal("trialing"),
      v.literal("unpaid")
    ),
    plan: v.union(
      v.literal("free"),
      v.literal("starter"),
      v.literal("professional"),
      v.literal("enterprise")
    ),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    trialStart: v.optional(v.number()),
    trialEnd: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    metadata: v.optional(v.object({
      seats: v.optional(v.number()),
      features: v.optional(v.array(v.string())),
    })),
  }).index('by_organization', ['organizationId'])
    .index('by_stripeCustomerId', ['stripeCustomerId'])
    .index('by_stripeSubscriptionId', ['stripeSubscriptionId'])
    .index('by_status', ['status'])
    .index('by_plan', ['plan']),

  invoices: defineTable({
    organizationId: v.id("organizations"),
    subscriptionId: v.optional(v.id("subscriptions")),
    stripeInvoiceId: v.string(),
    amount: v.number(),
    currency: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("open"),
      v.literal("paid"),
      v.literal("uncollectible"),
      v.literal("void")
    ),
    dueDate: v.optional(v.number()),
    paidAt: v.optional(v.number()),
    hostedInvoiceUrl: v.optional(v.string()),
    invoicePdf: v.optional(v.string()),
    description: v.optional(v.string()),
  }).index('by_organization', ['organizationId'])
    .index('by_subscription', ['subscriptionId'])
    .index('by_stripeInvoiceId', ['stripeInvoiceId'])
    .index('by_status', ['status'])
    .index('by_dueDate', ['dueDate']),

  usageMetrics: defineTable({
    organizationId: v.id("organizations"),
    metric: v.string(), // e.g., "api_calls", "storage_bytes", "users"
    value: v.number(),
    period: v.string(), // e.g., "2024-01", "2024-01-15"
    periodType: v.union(v.literal("daily"), v.literal("monthly"), v.literal("yearly")),
    metadata: v.optional(v.object({
      breakdown: v.optional(v.record(v.string(), v.number())),
    })),
  }).index('by_organization', ['organizationId'])
    .index('by_organizationAndMetric', ['organizationId', 'metric'])
    .index('by_period', ['period'])
    .index('by_periodType', ['periodType']),

  // ====================
  // NOTIFICATIONS
  // ====================
  
  notifications: defineTable({
    userId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    type: v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("error"),
      v.literal("invitation"),
      v.literal("billing"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    isRead: v.optional(v.boolean()),
    readAt: v.optional(v.number()),
    actionUrl: v.optional(v.string()),
    actionText: v.optional(v.string()),
    metadata: v.optional(v.object({
      relatedEntityId: v.optional(v.string()),
      relatedEntityType: v.optional(v.string()),
    })),
    expiresAt: v.optional(v.number()),
  }).index('by_user', ['userId'])
    .index('by_userAndIsRead', ['userId', 'isRead'])
    .index('by_organization', ['organizationId'])
    .index('by_type', ['type'])
    .index('by_expiresAt', ['expiresAt']),

  notificationPreferences: defineTable({
    userId: v.id("users"),
    emailNotifications: v.optional(v.boolean()),
    pushNotifications: v.optional(v.boolean()),
    preferences: v.object({
      invitations: v.optional(v.boolean()),
      billing: v.optional(v.boolean()),
      system: v.optional(v.boolean()),
      marketing: v.optional(v.boolean()),
      teamUpdates: v.optional(v.boolean()),
    }),
  }).index('by_user', ['userId']),

  // ====================
  // AUDIT LOGGING
  // ====================
  
  auditLogs: defineTable({
    userId: v.optional(v.id("users")),
    organizationId: v.optional(v.id("organizations")),
    action: v.string(), // e.g., "user.created", "org.member.added", "subscription.updated"
    resource: v.string(), // e.g., "user", "organization", "subscription"
    resourceId: v.optional(v.string()),
    details: v.optional(v.object({
      changes: v.optional(v.record(v.string(), v.any())),
      metadata: v.optional(v.record(v.string(), v.any())),
    })),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    severity: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
  }).index('by_user', ['userId'])
    .index('by_organization', ['organizationId'])
    .index('by_action', ['action'])
    .index('by_resource', ['resource'])
    .index('by_resourceId', ['resourceId'])
    .index('by_severity', ['severity']),

  // ====================
  // FILE STORAGE
  // ====================
  
  files: defineTable({
    storageId: v.id("_storage"),
    userId: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    name: v.string(),
    originalName: v.string(),
    mimeType: v.string(),
    size: v.number(),
    url: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.object({
      width: v.optional(v.number()),
      height: v.optional(v.number()),
      duration: v.optional(v.number()),
    })),
    uploadedAt: v.number(),
    expiresAt: v.optional(v.number()),
  }).index('by_user', ['userId'])
    .index('by_organization', ['organizationId'])
    .index('by_storageId', ['storageId'])
    .index('by_isPublic', ['isPublic'])
    .index('by_uploadedAt', ['uploadedAt'])
    .index('by_expiresAt', ['expiresAt']),

  // ====================
  // API KEYS & INTEGRATIONS
  // ====================
  
  apiKeys: defineTable({
    organizationId: v.id("organizations"),
    createdBy: v.id("users"),
    name: v.string(),
    keyHash: v.string(), // hashed API key for security
    prefix: v.string(), // first few characters for identification
    permissions: v.array(v.string()),
    isActive: v.optional(v.boolean()),
    lastUsedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    rateLimit: v.optional(v.object({
      requests: v.number(),
      windowMs: v.number(),
    })),
  }).index('by_organization', ['organizationId'])
    .index('by_createdBy', ['createdBy'])
    .index('by_keyHash', ['keyHash'])
    .index('by_isActive', ['isActive'])
    .index('by_expiresAt', ['expiresAt']),

  // ====================
  // ENHANCED PROJECT MANAGEMENT SYSTEM
  // ====================
  
  // Enhanced boards with user ownership and collaboration
  boards: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    color: v.string(),
    createdBy: v.id("users"),
    organizationId: v.optional(v.id("organizations")),
    isArchived: v.optional(v.boolean()),
    isTemplate: v.optional(v.boolean()),
    templateCategory: v.optional(v.string()),
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
  })
    .index('by_createdBy', ['createdBy'])
    .index('by_organization', ['organizationId'])
    .index('by_visibility', ['visibility'])
    .index('by_isArchived', ['isArchived'])
    .index('by_isTemplate', ['isTemplate'])
    .index('by_templateCategory', ['templateCategory'])
    .index('by_lastActivity', ['lastActivityAt']),

  // Board members with roles and permissions
  boardMembers: defineTable({
    boardId: v.id("boards"),
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
  })
    .index('by_board', ['boardId'])
    .index('by_user', ['userId'])
    .index('by_boardAndUser', ['boardId', 'userId'])
    .index('by_role', ['role']),

  // User's favorite/starred boards
  boardFavorites: defineTable({
    boardId: v.id("boards"),
    userId: v.id("users"),
  })
    .index('by_user', ['userId'])
    .index('by_board', ['boardId'])
    .index('by_userAndBoard', ['userId', 'boardId']),

  // Enhanced columns with better organization
  columns: defineTable({
    boardId: v.id("boards"),
    name: v.string(),
    description: v.optional(v.string()),
    order: v.number(),
    color: v.optional(v.string()),
    isArchived: v.optional(v.boolean()),
    createdBy: v.id("users"),
    wipLimit: v.optional(v.number()), // Work in Progress limit
    settings: v.optional(v.object({
      autoSort: v.optional(v.string()),
      cardTemplate: v.optional(v.string()),
    })),
  })
    .index('by_board', ['boardId'])
    .index('by_boardAndOrder', ['boardId', 'order'])
    .index('by_createdBy', ['createdBy'])
    .index('by_isArchived', ['isArchived']),

  // Enhanced cards with rich features
  cards: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    content: v.optional(v.string()), // Rich text content
    boardId: v.id("boards"),
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
    customFields: v.optional(v.object({})), // For custom field values
    completedAt: v.optional(v.number()),
  })
    .index('by_board', ['boardId'])
    .index('by_column', ['columnId'])
    .index('by_columnAndOrder', ['columnId', 'order'])
    .index('by_createdBy', ['createdBy'])
    .index('by_assignedTo', ['assignedTo'])
    .index('by_dueDate', ['dueDate'])
    .index('by_priority', ['priority'])
    .index('by_status', ['status'])
    .index('by_isArchived', ['isArchived']),

  // Card comments for discussions
  cardComments: defineTable({
    cardId: v.id("cards"),
    authorId: v.id("users"),
    content: v.string(),
    mentions: v.optional(v.array(v.id("users"))),
    isEdited: v.optional(v.boolean()),
    editedAt: v.optional(v.number()),
  })
    .index('by_card', ['cardId'])
    .index('by_author', ['authorId'])
    .index('by_creationTime', ['_creationTime']),

  // Card attachments
  cardAttachments: defineTable({
    cardId: v.id("cards"),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
    storageId: v.id("_storage"),
    uploadedBy: v.id("users"),
  })
    .index('by_card', ['cardId'])
    .index('by_uploadedBy', ['uploadedBy']),

  // Card checklists and subtasks
  cardChecklists: defineTable({
    cardId: v.id("cards"),
    title: v.string(),
    items: v.array(v.object({
      id: v.string(),
      text: v.string(),
      completed: v.boolean(),
      assignedTo: v.optional(v.id("users")),
      dueDate: v.optional(v.number()),
    })),
    createdBy: v.id("users"),
  })
    .index('by_card', ['cardId'])
    .index('by_createdBy', ['createdBy']),

  // Board activity/audit trail
  boardActivities: defineTable({
    boardId: v.id("boards"),
    userId: v.id("users"),
    action: v.string(), // "created_board", "added_card", "moved_card", etc.
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
    metadata: v.optional(v.object({})),
  })
    .index('by_board', ['boardId'])
    .index('by_user', ['userId'])
    .index('by_boardAndTime', ['boardId', '_creationTime'])
    .index('by_entityType', ['entityType']),

})

export default schema

// ====================
// TYPE EXPORTS
// ====================

// User types
export type UserProfile = Infer<typeof schema.tables.userProfiles.validator>

// Organization types
export type Organization = Infer<typeof schema.tables.organizations.validator>
export type OrganizationMember = Infer<typeof schema.tables.organizationMembers.validator>
export type Team = Infer<typeof schema.tables.teams.validator>
export type TeamMember = Infer<typeof schema.tables.teamMembers.validator>

// Billing types
export type Subscription = Infer<typeof schema.tables.subscriptions.validator>
export type Invoice = Infer<typeof schema.tables.invoices.validator>
export type UsageMetric = Infer<typeof schema.tables.usageMetrics.validator>

// Notification types
export type Notification = Infer<typeof schema.tables.notifications.validator>
export type NotificationPreferences = Infer<typeof schema.tables.notificationPreferences.validator>

// Audit & Security types
export type AuditLog = Infer<typeof schema.tables.auditLogs.validator>
export type ApiKey = Infer<typeof schema.tables.apiKeys.validator>

// File types
export type File = Infer<typeof schema.tables.files.validator>

// Enhanced Board System types
export type Board = Infer<typeof schema.tables.boards.validator>
export type BoardMember = Infer<typeof schema.tables.boardMembers.validator>
export type BoardFavorite = Infer<typeof schema.tables.boardFavorites.validator>
export type Column = Infer<typeof schema.tables.columns.validator>
export type Card = Infer<typeof schema.tables.cards.validator>
export type CardComment = Infer<typeof schema.tables.cardComments.validator>
export type CardAttachment = Infer<typeof schema.tables.cardAttachments.validator>
export type CardChecklist = Infer<typeof schema.tables.cardChecklists.validator>
export type BoardActivity = Infer<typeof schema.tables.boardActivities.validator>


// ====================
// VALIDATION SCHEMAS
// ====================

// Enhanced Board System validation schemas
export const createBoardSchema = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  color: v.string(),
  organizationId: v.optional(v.id("organizations")),
  visibility: v.union(
    v.literal("private"),
    v.literal("team"),
    v.literal("organization"),
    v.literal("public")
  ),
  tags: v.optional(v.array(v.string())),
  isTemplate: v.optional(v.boolean()),
  templateCategory: v.optional(v.string()),
})

export const updateBoardSchema = v.object({
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  color: v.optional(v.string()),
  visibility: v.optional(v.union(
    v.literal("private"),
    v.literal("team"),
    v.literal("organization"),
    v.literal("public")
  )),
  tags: v.optional(v.array(v.string())),
  settings: v.optional(v.object({
    allowComments: v.optional(v.boolean()),
    allowAttachments: v.optional(v.boolean()),
    cardAutoArchive: v.optional(v.boolean()),
  })),
})

export const createColumnSchema = v.object({
  boardId: v.id("boards"),
  name: v.string(),
  description: v.optional(v.string()),
  color: v.optional(v.string()),
  wipLimit: v.optional(v.number()),
})

export const updateColumnSchema = v.object({
  name: v.optional(v.string()),
  description: v.optional(v.string()),
  order: v.optional(v.number()),
  color: v.optional(v.string()),
  wipLimit: v.optional(v.number()),
})

export const createCardSchema = v.object({
  title: v.string(),
  description: v.optional(v.string()),
  content: v.optional(v.string()),
  boardId: v.id("boards"),
  columnId: v.id("columns"),
  assignedTo: v.optional(v.array(v.id("users"))),
  dueDate: v.optional(v.number()),
  priority: v.optional(v.union(
    v.literal("low"),
    v.literal("medium"),
    v.literal("high"),
    v.literal("urgent")
  )),
  labels: v.optional(v.array(v.string())),
  estimatedHours: v.optional(v.number()),
})

export const updateCardSchema = v.object({
  title: v.optional(v.string()),
  description: v.optional(v.string()),
  content: v.optional(v.string()),
  columnId: v.optional(v.id("columns")),
  order: v.optional(v.number()),
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
  completedAt: v.optional(v.number()),
})

export const addBoardMemberSchema = v.object({
  boardId: v.id("boards"),
  userId: v.id("users"),
  role: v.union(
    v.literal("admin"),
    v.literal("member"),
    v.literal("viewer")
  ),
  permissions: v.optional(v.array(v.string())),
})

export const createCardCommentSchema = v.object({
  cardId: v.id("cards"),
  content: v.string(),
  mentions: v.optional(v.array(v.id("users"))),
})

