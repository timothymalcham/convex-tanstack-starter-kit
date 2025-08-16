import {  query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
    args: {},
    handler : async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").take(50)
        return todos.reverse()
    }
})

export const create = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("This TypeScript function is running on the server, it creates a todo item.");
        await ctx.db.insert("todos", {
            title: args.title,
        })
    }
})