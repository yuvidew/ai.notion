import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        orgId: v.string(),
        type: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        return await ctx.db.insert("documents", {
            title: "Untitled",
            type: args.type,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            isPublished: false,
            isPined: false,
            coverImage: "/placeholder/board-img-5.jpg",
            document: JSON.stringify([
                {
                    "id": "c4e293e8-3303-4366-867c-0d1f9ea8381b",
                    "type": "paragraph",
                    "props": {
                        "textColor": "default",
                        "backgroundColor": "default",
                        "textAlignment": "left"
                    },
                    "content": [],
                    "children": []
                },
                {
                    "id": "a7ee19c8-833c-441c-bab7-db37dfbfd9f3",
                    "type": "paragraph",
                    "props": {
                        "textColor": "default",
                        "backgroundColor": "default",
                        "textAlignment": "left"
                    },
                    "content": [],
                    "children": []
                }
            ])
        })
    },
})

// it's help to update the title

export const update = mutation({
    args : { id: v.id("documents"), title: v.string()},
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();


        if (!identity) {
            throw new Error("Unauthorized")

        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title is required")
        }

        if (title.length > 50) {
            throw new Error("Title cannot be longer than 50 characters")

        }

        return await ctx.db.patch(args.id, {
            title: args.title
        })
    }
})

// it's help to remove document
export const remove = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_file", (q) =>
                q
                    .eq("userId", userId)
                    .eq("fileId", args.id)
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        return await ctx.db.delete(args.id)
    }
})

//it's help to pined document
export const favorites = mutation({
    args: { id: v.id("documents"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        return await ctx.db.patch(args.id, {
            isPined: true,
            orgId: args.orgId,
        });
    }
})

//it's help to pined document
export const unFavorites = mutation({
    args: { id: v.id("documents"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        return await ctx.db.patch(args.id, {
            isPined: false,
            orgId: args.orgId,
        });
    }
})

//it's help to get all documents
export const get = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const document = ctx.db.get(args.id);

        return document
    }
})