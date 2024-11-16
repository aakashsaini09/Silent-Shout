import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt';
export const userRoute = new Hono<{
    Bindings: {
	DATABASE_URL: string,
    JWT_SEC: string
	}
}>()



userRoute.post('/login', async(c) => {
  const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const user = await prisma.user.findFirst({
      where:{
        email: body.email,
        password: body.password
      }
    })
    if(!user){
      c.status(403);
      return c.json({
        success: false,
        message: "Incorrect Credentials"
      })
    }
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SEC)
    return c.json({
      success: true,
      message: "signin Success!!",
      user: user,
      jwt: jwt
    })
  } catch (err) {
    c.status(411);
    return c.text("Invalid Credentials")
  }
})



userRoute.post('/signup', async(c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const user = await prisma.user.create({
      data:{
        name: body.name,
        email: body.email,
        accepting: true,
        password: body.password
      }
    })
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SEC)
    return c.json({
      message: 'Sign-up Successfully!',
      success: true,
      user: user,
      token: jwt
    })
  } catch (err) {
    console.log(err)
    c.status(411);
    return c.json({
      error: err,
      message: "User Already exist",
      success: false
    })
  }
})



userRoute.get('/getall', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const users = await prisma.user.findMany()
    if(!users){
      c.status(403);
      return c.json({
        message: "Server Error"
      })
    }
    
    return c.json({
      user: users
    })
  } catch (err) {
    c.status(411);
    return c.json({
        message: "Error while fetching blog post",
        err: err
    })
  }
})


userRoute.post('/addfeed/:id', async(c) =>{
  const body = await c.req.json()
  const id = c.req.param('id').toString()
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const feed = await prisma.feedbacks.create({
      data:{
          title: body.title,
          authorId: parseInt(id, 10),
          date: new Date().toISOString()
      }
  })
  if(!feed) {
      return c.json({
          message: "Server Error",
          success: false
      });
  }
  
  return c.json({
      message: "Feed Added successfully",
      success: true,
      feed: feed
  });
})

