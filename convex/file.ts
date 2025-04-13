import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//it's help to upload image
export const generateUploadUrl = mutation(async(ctx) => {
    return await ctx.storage.generateUploadUrl()
})

// it's help to create new file
export const create = mutation({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthorized")
        }

        return await ctx.db.insert("documents", {
            title: "Untitled",
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
    args : { 
        id: v.id("documents"), 
        title:v.optional(v.string()),
        isPublished : v.optional(v.boolean()),
        document : v.optional(v.string()),
        coverImage : v.optional(v.string()),
        icon : v.optional(v.string()),
    },
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")

        }

        const {id , ...rest} = args;

        const existingDocument = await ctx.db.get(id);

        if(!existingDocument){
            throw new Error("Not found")
        }

        return await ctx.db.patch(args.id, {
            ...rest
        })
    }
})

// it's help to remove Icon
export const removeIcon = mutation({
    args : {
        id : v.id("documents")
    },
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error('Unauthorized');
        }

        const existingDocument = await ctx.db.get(args.id)

        if(!existingDocument){
            throw new Error("Not found")
        }

        const result = await ctx.db.patch(args.id , {
            icon : undefined
        })

        return result
    }
})

// it's help to remove image
export const removeCoverImage = mutation({
    args : {
        id : v.id("documents")
    },
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error('Unauthorized');
        }

        const existingDocument = await ctx.db.get(args.id)

        if(!existingDocument){
            throw new Error("Not found")
        }

        const result = await ctx.db.patch(args.id , {
            coverImage : undefined
        })

        return result
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
export const getById = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    }
})

//it's help to get the image
export const getImageUrl = mutation({
    args: {
        storageId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})