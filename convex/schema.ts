import {v} from "convex/values";
import {defineSchema , defineTable} from "convex/server";

export default defineSchema({
    documents : defineTable({
        title : v.string(),
        orgId : v.string(),
        authorId : v.string(),
        authorName : v.string(),
        isPublished : v.boolean(),
        document : v.optional(v.string()),
        coverImage : v.optional(v.any()),
        icon : v.optional(v.string()),
        isPined : v.boolean(),
    })
    .index("by_org" , ["orgId"])
    .index("by_org_pined" , ["orgId" , "isPined"])
    .searchIndex("search_title" , {
        searchField : "title",
        filterFields: ["orgId"]
    }),

    userFavorites : defineTable({
        orgId : v.string(),
        userId : v.string(),
        fileId : v.id("documents")
    })
    .index("by_file" , ["fileId" ])
    .index("by_user_org" , ["userId" , "orgId"])
    .index("by_user_file" , ["userId" , "fileId"])
    .index("by_user_file_org" , ["userId" , "fileId" , "orgId"])
})