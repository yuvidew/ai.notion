import { v } from "convex/values";
import { query } from "./_generated/server";
// import {getAllOrThrow} from "convex-helpers/server/relationships"

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.boolean()),
        type : v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) throw new Error("Unauthorized");

        if (args.search) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) =>
                    q.search("title", args.search!).eq("orgId", args.orgId)
                )
                .collect();
        }

        if (args.type) {
            return await ctx.db
                .query("documents")
                .withIndex("by_org_type", (q) =>
                    q
                    .eq("orgId", args.orgId)
                    .eq("type", args.type!)
                )
                .collect();
        }


        if (args.favorites == true) {
            return await ctx.db
                .query("documents")
                .withIndex("by_org_pined", (q) =>
                    q.eq("orgId", args.orgId).eq("isPined", true)
                ).collect()
        }

        return await ctx.db
            .query("documents")
            .withIndex("by_org", (q) =>
                q.eq("orgId", args.orgId)
            ).collect()
    },
});
