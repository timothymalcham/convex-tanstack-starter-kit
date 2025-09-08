import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    users: defineTable({
        email: v.optional(v.string()),
    }),
    todos: defineTable({
        title: v.string(),
    })
});

export default schema;