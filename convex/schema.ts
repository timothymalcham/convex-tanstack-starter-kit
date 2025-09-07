import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    users: defineTable({
        // Fields are optional
    }),
    todos: defineTable({
        title: v.string(),
    })
});

export default schema;