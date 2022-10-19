import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Prisma, PrismaClient } from '@prisma/client';
import { teste } from '../teste';
const prismaClient = new PrismaClient();
const typeDefs = `#graphql
  scalar JSON
  scalar DateTime

  type Ad {
    id: ID!
    name: String
    gameId:          String
    yearsPlaying:    Int
    discord:         String 
    weekDays:        JSON
    hourStart:       Int
    hourEnd:         Int
    useVoiceChannel: Boolean
    createAt:        DateTime 
  }

  type Game{
    id: ID!
    title: String
    bannerUrl: String
    _count: JSON
  }

  type Query {
    discordById(id: ID!): Ad
    gameById(id: ID!): Game
    adsByGame(id: ID!): [Ad]
    game: [Game]
    ad: [Ad]
  }

  type Mutation{
    createAd(
    name: String
    gameId:          String
    yearsPlaying:    Int
    discord:         String 
    weekDays:        JSON
    hourStart:       Int
    hourEnd:         Int
    useVoiceChannel: Boolean
    ): Ad
  }
`;


const resolvers = {
  Query:{
    ad: async ()=>{
      return await prismaClient.ad.findMany();
    },
    game: async ()=> {return await prismaClient.game.findMany({
      
      include: {
        _count:{
          select:{
            ads: true
          }
        }
      }
    });
  },
  discordById: async (_: any,args:{id:string}) => {
    return await prismaClient.ad.findUniqueOrThrow({
      select:{
        discord: true
      },
      where: {
        id: args.id
      }
    })
  },

  adsByGame: async (_: any,args:{id:string}) => {
    return await prismaClient.ad.findMany({
      select:{
        id: true,
        name: true,
        gameId: true,
        yearsPlaying: true,
        discord: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        useVoiceChannel: true,
        createAt: true,
      },
      where: {
        gameId: args.id
      }
    })
  },
  },
  Mutation:{
    async createAd(_: any,
      name: string,gameId:string,yearsPlaying: number,discord: string,weekDays: {}, hourStart: string,
      hourEnd: string,useVoiceChannel: boolean)
       {
      // let newHourStart = convertHourStringToHour(hourStart);
      // let newHourEnd = convertHourStringToHour(hourEnd); 

      // const createAdData: Prisma.AdCreateInput = {
      //   name: name,
      //   yearsPlaying: yearsPlaying,
      //   discord: discord,
      //   weekDays: weekDays,
      //   hourStart: newHourStart,
      //   hourEnd: newHourEnd,
      //   useVoiceChannel: useVoiceChannel
      // }
      // await prismaClient.ad.create({
      //   data: createAdData
      // })
    }
  }
};   

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server,{
  listen: {port: 4000}
} );

console.log(`🚀  Server ready at: ${url}`, teste);