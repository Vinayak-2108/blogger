import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { verify } from "hono/jwt";


const api = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables:{
    userId: string,
  }
}>()

api.use('/*', cors())
api.use('/api/v1/blog/*',async (c,next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
      c.status(401)
      return c.json({
          error: "Unauthorized",
      });
  }
  const userId = await verify(token, c.env.JWT_SECRET);
  if(!userId){
      c.status(401)
      return c.json({
          error: "Unauthorized",
      });
  }
  c.set("userId", String(userId.id));
  await next();
});

api.route('/api/v1/user', userRouter)
api.route('/api/v1/blog', blogRouter)

export default api
