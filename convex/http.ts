import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { profile } from "console";
import { userInfo } from "os";

const http = httpRouter();

http.route({
    path: "/clerk",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const payloadString = await request.text();
        const headerPayload = request.headers;

        try {
            const result = await ctx.runAction(internal.clerk.fulfill, {
                payload: payloadString,
                headers: {
                    "svix-id": headerPayload.get("svix-id")!,
                    "svix-timestamp": headerPayload.get("svix-timestamp")!,
                    "svix-signature": headerPayload.get("svix-signature")!,
                },
            });

            switch (result.type) {
                case "user.created":
                    await ctx.runMutation(internal.users.createUser, {
                        tokenIdentifier: `${result.data.id}`,
                    });
                    break;

                case 'organizationMembership.created':
<<<<<<< HEAD
                    await ctx.runMutation(internal.users.addOrgIdTouser, {
=======
                    await ctx.runMutation(internal.users.addOrgIdToUser, {
>>>>>>> 6fdac7634c022249a2db0a26bd71b86b235b25e7
                        tokenIdentifier: `${result.data.public_user_data.user_id}`,
                        orgId: result.data.organization.id
                    });
                    break;
            }

            return new Response(null, {
                status: 200,
            });
        } catch (err) {
            return new Response("Webhook Error", {
                status: 400,
            });
        }
    }),
});

export default http;