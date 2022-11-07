import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name:'italo santos',
            email: 'italosantos9829@gmail.com',
            avatarUrl:'https://github.com/italo1033.png'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title:'example pool',
            code:'BoL128',
            ownerId: user.id ,

            //permite criar o participante e o boolao {
            participant:{
                create:{
                    userId: user.id
                }
            }

        // } 
         }
    })


    await prisma.game.create({
        data:{
            date:'2022-11-20T04:24:02.159Z',
            firstTeamCountryCode:'DE',
            secondTeamCountryCode:"PT"
        }
    })
    await prisma.game.create({
        data:{
            date:'2022-11-19T14:21:00',
            firstTeamCountryCode:'DE',
            secondTeamCountryCode:"BR",

            guesses:{
                create:{
                    firstTeamPoints:2,
                    secondTeamPoints:1,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

    // criando esquema da forma convencional
    // const participant = await prisma.participant.create({
    //     data:{
    //         poolId: pool.id,
    //         userId:user.id
    //     }
    // })
}

main()