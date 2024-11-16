import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
export const feedRoute = new Hono<{
    Bindings: {
	DATABASE_URL: string,
    JWT_SEC: string
	},
    Variables: {
        userId: string
    }
}>()
feedRoute.use('/*', async(c, next) => {
    const token = c.req.header('authorization') || ''
    try {
        const user = await verify(token, c.env.JWT_SEC)
        if(user.id){
            c.set("userId", user.id as string)
            await next()
        }else{
            c.status(403)
            return c.json({
                message: "You are not looged in!"
            })
        }
    } catch (error) {
        console.log("error is: ", error)
        c.status(403)
            return c.json({
                message: "You are not looged in!"
            })
    }
})
feedRoute.post('/getuserfeed', async(c) =>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try { 

        const feeds = await prisma.feedbacks.findMany({
            where: {
                authorId: Number(body.id)
            }
        })
        if(!feeds) {
            return c.json({
                message: "Server Error!!",
                success: false,
                feeds: feeds
            });
        }
        
        return c.json({
            message: "Fetched Successfully",
            success: true,
            feeds: feeds
        });
    } catch (error) {
        console.log("error is this: ", error)
        return c.json({
            message: "Server Error!!",
            success: false,
            error: error
        });
    }
})
feedRoute.delete('/deleteuserfeed', async(c) =>{
    const id = c.req.header('id')
    console.log("header is: ", c.req.header)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const feed = await prisma.feedbacks.delete({
            where: {
                id: Number(id)
            }
        })
        if(!feed) {
            return c.json({
                message: "Server Error",
                success: false
            });
        }
        
        return c.json({
            message: "Deleted Successfully",
            success: true,
        });
    } catch (error) {
        return c.json({
            message: "Server Error",
            success: false,
            error: error
        });
    }
    
})
feedRoute.patch('/update', async(c) =>{
    const id = c.req.header('id')
    const body = await c.req.json()
    console.log("body is: ", body)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                accepting: !body.accepting
            }
        })
        if(!updatedUser) {
            return c.json({
                message: "Something went wrong. Please try again",
                success: false,
                updatedUser: updatedUser
            });
        }
        
        return c.json({
            message: "Updated Successfully",
            success: true,
            updatedUser: updatedUser
        });
    } catch (error) {
        console.log("error: ", error)
        return c.json({
            message: "Server Error. Please try again",
            success: false,
            error: error
        });
    }
    
})