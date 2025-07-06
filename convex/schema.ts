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
    .index('by_severity', ['severity'])
    .index('by_creationTime', ['_creationTime']),

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
  // LEGACY BOARD SYSTEM (TO BE REMOVED)
  // ====================
  // Note: These tables will be removed as part of the migration to the new task system
  
  boards: defineTable({
    id: v.string(),
    name: v.string(),
    color: v.string(),
  }).index('id', ['id']),

  columns: defineTable({
    id: v.string(),
    boardId: v.string(),
    name: v.string(),
    order: v.number(),
  })
    .index('id', ['id'])
    .index('board', ['boardId']),

  items: defineTable({
    id: v.string(),
    title: v.string(),
    content: v.optional(v.string()),
    order: v.number(),
    columnId: v.string(),
    boardId: v.string(),
  })
    .index('id', ['id'])
    .index('column', ['columnId'])
    .index('board', ['boardId']),
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

// Legacy types (to be removed)
export type Board = Infer<typeof schema.tables.boards.validator>
export type Column = Infer<typeof schema.tables.columns.validator>
export type Item = Infer<typeof schema.tables.items.validator>

// ====================
// VALIDATION SCHEMAS
// ====================

// Legacy board schemas (to be removed)
const board = schema.tables.boards.validator
const column = schema.tables.columns.validator
const item = schema.tables.items.validator

export const updateBoardSchema = v.object({
  id: board.fields.id,
  name: v.optional(board.fields.name),
  color: v.optional(v.string()),
})

export const updateColumnSchema = v.object({
  id: column.fields.id,
  boardId: column.fields.boardId,
  name: v.optional(column.fields.name),
  order: v.optional(column.fields.order),
})

export const deleteItemSchema = v.object({
  id: item.fields.id,
  boardId: item.fields.boardId,
})

const { order, id, ...rest } = column.fields
export const newColumnsSchema = v.object(rest)

export const deleteColumnSchema = v.object({
  boardId: column.fields.boardId,
  id: column.fields.id,
})