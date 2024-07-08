import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx } from './_generated/server';
import { getUser } from "./users";

async function hasAccessToOrg(ctx: QueryCtx | MutationCtx, tokenIdentifier: string, orgId: string) {
    const user = await getUser(ctx, tokenIdentifier);

    const hasAccess = user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);
}

export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("you must be loggend in to upload a file")
        }
<<<<<<< HEAD
        
=======

        const user =await ctx.db.query('users').withIndex()
>>>>>>> 6fdac7634c022249a2db0a26bd71b86b235b25e7

        await ctx.db.insert("files", {
            name: args.name,
            orgId: args.orgId,
        });
    },
});


export const getFiles = query({
    args: {
        orgId: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return [];
        }
        return ctx.db.query('files').withIndex("by_orgId", (q) =>
            q.eq('orgId', args.orgId)
        ).collect();
    }
});