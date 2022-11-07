import Fastify from "fastify";
import cors from "@fastify/cors"
import {PrismaClient} from "@prisma/client"
import ShortUniqueId from "short-unique-id"

import {z} from "zod"

const prisma = new PrismaClient({
    log: ['query'],
})

async function boostrap() {
    // criando servidor
    const fastify = Fastify({
        logger : true // serve para mostra tudo que acontece na aplicação
    })

    await fastify.register(cors,{
        origin:true
    })
    //criando rotas

    fastify.get("/pools/count", async()=>{
        //comunicação com banco
        // const pools = await prisma.pool.findMany({
        //     where:{
        //         code:{
        //             startsWith:"I"
        //         }
        //     }
        // })

        const pools = await prisma.pool.count()
        return {pools}
    })

    fastify.get("/users/count", async()=>{
        const users = await prisma.user.count()
        return {users}
    })

    fastify.get("/guesses/count", async()=>{
        const guesses = await prisma.guess.count()
        return {guesses}
    })


    fastify.post("/pools", async(req, res)=>{

        //o z da biblioteca zod vai impedir que a API coloque um valor nullo
        const createPoolBody = z.object({
            title:z.string(),
        })

        const {title} = createPoolBody.parse(req.body)

        const generate = new ShortUniqueId({ length: 6 });
        const code = String(generate()).toUpperCase()
        await prisma.pool.create({
            data:{
                title,
                code,
            }
        })

        //o codigo 201 significa criação
        return  res.status(201).send({code})
      })

    //informando a porta
    await fastify.listen({port:3333, /*host:'0.0.0.0' */})
}

boostrap();