import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput, createPostInput, updatePostInput } from "@vinayak2108/common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success} = signupInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({error: "Invalid input"});
    }

    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if(checkUser){
            c.status(403);
            return c.json({error: "User already exists"});
        }
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    
        return c.json({
            jwt: token,
        });
    } catch (e) {
        c.status(403);
        return c.json({ error: "Error while signing up" })
    }

});

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);

    if(!success){
        c.status(400);
        return c.json({error: "Invalid input"});
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "User not found" });
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token });
    } catch (e) {
        c.status(403);
        return c.json({ error: "Error while signing in" });
    }
});
