import Fastify from "fastify";
import cors from "@fastify/cors"
import {PrismaClient} from "@prisma/client"

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

    //informando a porta
    await fastify.listen({port:3333, /*host:'0.0.0.0' */})
}

boostrap();