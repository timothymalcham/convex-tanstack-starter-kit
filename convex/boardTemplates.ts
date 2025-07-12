import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const seedBoardTemplates = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    // Get system user (first user) to own templates
    const systemUser = await ctx.db.query("users").first();
    if (!systemUser) {
      throw new Error("No users found - cannot create templates");
    }

    // Project Management Templates
    const projectManagementTemplates = [
      {
        name: "Agile Sprint Board",
        description: "A standard agile sprint board with backlog, in progress, review, and done columns",
        color: "#3B82F6",
        templateCategory: "Project Management",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["agile", "sprint", "development"],
        columns: [
          { name: "Backlog", description: "Stories ready for development", order: 1, color: "#E5E7EB" },
          { name: "In Progress", description: "Currently being worked on", order: 2, color: "#FEF3C7", wipLimit: 3 },
          { name: "Review", description: "Ready for review", order: 3, color: "#DBEAFE" },
          { name: "Done", description: "Completed stories", order: 4, color: "#D1FAE5" }
        ]
      },
      {
        name: "Kanban Board",
        description: "Simple kanban workflow for continuous delivery",
        color: "#10B981",
        templateCategory: "Project Management",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["kanban", "workflow", "continuous"],
        columns: [
          { name: "To Do", description: "Tasks to be started", order: 1, color: "#F3F4F6" },
          { name: "Doing", description: "Work in progress", order: 2, color: "#FEF3C7", wipLimit: 5 },
          { name: "Done", description: "Completed work", order: 3, color: "#D1FAE5" }
        ]
      },
      {
        name: "Product Roadmap",
        description: "Track feature development across quarters",
        color: "#8B5CF6",
        templateCategory: "Project Management",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["roadmap", "product", "planning"],
        columns: [
          { name: "Ideas", description: "Feature ideas and requests", order: 1, color: "#F3F4F6" },
          { name: "Q1 2024", description: "First quarter features", order: 2, color: "#FEF3C7" },
          { name: "Q2 2024", description: "Second quarter features", order: 3, color: "#DBEAFE" },
          { name: "Q3 2024", description: "Third quarter features", order: 4, color: "#E0E7FF" },
          { name: "Released", description: "Live features", order: 5, color: "#D1FAE5" }
        ]
      }
    ];

    // Software Development Templates
    const softwareDevelopmentTemplates = [
      {
        name: "Bug Tracker",
        description: "Track and resolve software bugs efficiently",
        color: "#EF4444",
        templateCategory: "Software Development",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["bugs", "tracking", "qa"],
        columns: [
          { name: "Reported", description: "Newly reported bugs", order: 1, color: "#FEE2E2" },
          { name: "Triaged", description: "Bugs assigned priority", order: 2, color: "#FEF3C7" },
          { name: "In Progress", description: "Being fixed", order: 3, color: "#DBEAFE", wipLimit: 3 },
          { name: "Testing", description: "Ready for QA", order: 4, color: "#E0E7FF" },
          { name: "Resolved", description: "Fixed and verified", order: 5, color: "#D1FAE5" }
        ]
      },
      {
        name: "Feature Development",
        description: "End-to-end feature development workflow",
        color: "#F59E0B",
        templateCategory: "Software Development",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["features", "development", "workflow"],
        columns: [
          { name: "Requirements", description: "Feature specs and requirements", order: 1, color: "#FEF3C7" },
          { name: "Design", description: "UI/UX design phase", order: 2, color: "#E0E7FF" },
          { name: "Development", description: "Code implementation", order: 3, color: "#DBEAFE", wipLimit: 4 },
          { name: "Code Review", description: "Peer review", order: 4, color: "#F3E8FF" },
          { name: "Testing", description: "QA and testing", order: 5, color: "#FEE2E2" },
          { name: "Deploy", description: "Ready for deployment", order: 6, color: "#D1FAE5" }
        ]
      },
      {
        name: "Code Review Board",
        description: "Manage code reviews and pull requests",
        color: "#6366F1",
        templateCategory: "Software Development",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["code-review", "pull-requests", "quality"],
        columns: [
          { name: "Ready for Review", description: "PRs awaiting review", order: 1, color: "#FEF3C7" },
          { name: "In Review", description: "Currently being reviewed", order: 2, color: "#DBEAFE", wipLimit: 5 },
          { name: "Changes Requested", description: "Needs modifications", order: 3, color: "#FEE2E2" },
          { name: "Approved", description: "Ready to merge", order: 4, color: "#D1FAE5" }
        ]
      }
    ];

    // Marketing Templates
    const marketingTemplates = [
      {
        name: "Content Calendar",
        description: "Plan and track content creation and publishing",
        color: "#EC4899",
        templateCategory: "Marketing",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["content", "calendar", "publishing"],
        columns: [
          { name: "Ideas", description: "Content ideas and concepts", order: 1, color: "#FCE7F3" },
          { name: "Writing", description: "Content being created", order: 2, color: "#FEF3C7", wipLimit: 3 },
          { name: "Review", description: "Ready for editing", order: 3, color: "#DBEAFE" },
          { name: "Scheduled", description: "Ready to publish", order: 4, color: "#E0E7FF" },
          { name: "Published", description: "Live content", order: 5, color: "#D1FAE5" }
        ]
      },
      {
        name: "Campaign Management",
        description: "Track marketing campaigns from idea to results",
        color: "#F97316",
        templateCategory: "Marketing",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["campaigns", "marketing", "tracking"],
        columns: [
          { name: "Planning", description: "Campaign ideation", order: 1, color: "#FED7AA" },
          { name: "Creative", description: "Asset creation", order: 2, color: "#FEF3C7" },
          { name: "Review", description: "Approval process", order: 3, color: "#DBEAFE" },
          { name: "Live", description: "Active campaigns", order: 4, color: "#C7F0DB" },
          { name: "Analysis", description: "Results and insights", order: 5, color: "#E0E7FF" }
        ]
      }
    ];

    // HR Templates
    const hrTemplates = [
      {
        name: "Hiring Pipeline",
        description: "Track candidates through the hiring process",
        color: "#14B8A6",
        templateCategory: "HR",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["hiring", "recruitment", "pipeline"],
        columns: [
          { name: "Applied", description: "New applications", order: 1, color: "#F0FDFA" },
          { name: "Phone Screen", description: "Initial screening", order: 2, color: "#CCFBF1" },
          { name: "Interview", description: "In-person/video interviews", order: 3, color: "#99F6E4" },
          { name: "Reference Check", description: "Checking references", order: 4, color: "#5EEAD4" },
          { name: "Offer", description: "Making offers", order: 5, color: "#2DD4BF" },
          { name: "Hired", description: "Successful hires", order: 6, color: "#14B8A6" }
        ]
      }
    ];

    // Sales Templates
    const salesTemplates = [
      {
        name: "Sales Pipeline",
        description: "Track leads through the sales funnel",
        color: "#059669",
        templateCategory: "Sales",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["sales", "pipeline", "leads"],
        columns: [
          { name: "Leads", description: "New prospects", order: 1, color: "#F0FDF4" },
          { name: "Qualified", description: "Qualified opportunities", order: 2, color: "#DCFCE7" },
          { name: "Proposal", description: "Proposals sent", order: 3, color: "#BBF7D0" },
          { name: "Negotiation", description: "Contract negotiation", order: 4, color: "#86EFAC" },
          { name: "Closed Won", description: "Successful sales", order: 5, color: "#22C55E" },
          { name: "Closed Lost", description: "Lost opportunities", order: 6, color: "#FEE2E2" }
        ]
      }
    ];

    // Personal Templates
    const personalTemplates = [
      {
        name: "Personal Task Manager",
        description: "Organize your personal tasks and goals",
        color: "#6B7280",
        templateCategory: "Personal",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["personal", "tasks", "productivity"],
        columns: [
          { name: "Inbox", description: "New tasks and ideas", order: 1, color: "#F9FAFB" },
          { name: "Today", description: "Today's priorities", order: 2, color: "#FEF3C7", wipLimit: 5 },
          { name: "This Week", description: "This week's tasks", order: 3, color: "#DBEAFE" },
          { name: "Someday", description: "Future tasks", order: 4, color: "#E5E7EB" },
          { name: "Done", description: "Completed tasks", order: 5, color: "#D1FAE5" }
        ]
      },
      {
        name: "Habit Tracker",
        description: "Track daily habits and build routines",
        color: "#7C3AED",
        templateCategory: "Personal",
        isTemplate: true,
        visibility: "public" as const,
        tags: ["habits", "tracking", "routine"],
        columns: [
          { name: "Morning", description: "Morning routine", order: 1, color: "#FEF3C7" },
          { name: "Workday", description: "Work-related habits", order: 2, color: "#DBEAFE" },
          { name: "Evening", description: "Evening routine", order: 3, color: "#F3E8FF" },
          { name: "Weekly", description: "Weekly goals", order: 4, color: "#E0E7FF" }
        ]
      }
    ];

    const allTemplates = [
      ...projectManagementTemplates,
      ...softwareDevelopmentTemplates,
      ...marketingTemplates,
      ...hrTemplates,
      ...salesTemplates,
      ...personalTemplates
    ];

    // Create board templates
    for (const template of allTemplates) {
      const { columns, ...boardData } = template;
      
      // Create the board
      const boardId = await ctx.db.insert("boards", {
        ...boardData,
        createdBy: systemUser._id,
        settings: {
          allowComments: true,
          allowAttachments: true,
          cardAutoArchive: false,
        },
        lastActivityAt: Date.now(),
      });

      // Create columns for each template
      for (const column of columns) {
        await ctx.db.insert("columns", {
          ...column,
          boardId,
          createdBy: systemUser._id,
          isArchived: false,
        });
      }

      // Log template creation
      await ctx.db.insert("boardActivities", {
        boardId,
        userId: systemUser._id,
        action: "created_template",
        entityType: "board",
        entityId: boardId,
        details: {
          title: template.name,
        },
        metadata: {
          templateCategory: template.templateCategory,
        },
      });
    }

    return null;
  },
});