import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@vinayak2108/common";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();


blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    });
    console.log(posts);
    return c.json(posts);
});

blogRouter.post('/blog', async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    console.log(userId);
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "Invalid input" });
    }

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
        },
    });
    return c.json({
        id: post.id,
    });
});

blogRouter.put('/blog', async(c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();

    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({ error: "Invalid input" });
    }

    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId,
        },
        data: {
            title: body.title,
            content: body.content,
        },
    });

    return c.text("Post Updated");
});

blogRouter.get('/:id', async(c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    });

    return c.json(post);
});




