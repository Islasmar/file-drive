import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation } from "./_generated/server";

export async function getUser(ctx: QueryCtx | MutationCtx, 
    tokenIdentifier: string){

    const user =  await ctx.db.
    query("users")
    .withIndex('by_tokenIdetifier', (q)=>
    q.eq('tokenIdentifier', tokenIdentifier)
    ).first();

    if (!user){
        throw new ConvexError("expected user to be definer");
    }
    return user ;

}

export const createUser = internalMutation({
    args: {tokenIdentifier: v.string()},
    async handler(ctx,args){
        await ctx.db.insert("users",{
            tokenIdentifier: args.tokenIdentifier,
            orgIds: [],
        });
        
    },
});

export const addOrgIdTouser = internalMutation({
    args: {tokenIdentifier: v.string(),orgId: v.string()},
    async handler(ctx,args){
        const user = await getUser(ctx, args.tokenIdentifier);

        
        await ctx.db.insert("users",{
            tokenIdentifier: args.tokenIdentifier,
            orgIds: [...user.orgIds, args.orgId]
        })
        
    }
})