import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Prisma, PrismaClient } from '@prisma/client';
import { convertHourStringToHour } from '../utils/convert_hour_string_to_hour';
import convertHourtoHourString from '../utils/convert_hour_to_hour_string';
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
    hourStart:       String
    hourEnd:         String
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
    hourStart:       String
    hourEnd:         String
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
    const adResponse =  await prismaClient.ad.findMany({
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

    const newAd = adResponse.map(ad =>{
      return {
        ...ad,
        hourStart: convertHourtoHourString(ad.hourStart),
        hourEnd: convertHourtoHourString(ad.hourEnd)
      }
    })

    return newAd
  },
  },
  Mutation:{
    async createAd(_: any,args:{name: string,gameId:string,yearsPlaying:number,discord:string,weekDays:{},
       hourStart:string,hourEnd:string,weekDayStart:string,weekDayEnd:string,useVoiceChannel:boolean})
       {
         let newHourStart = convertHourStringToHour(args.hourStart);
         let newHourEnd = convertHourStringToHour(args.hourEnd); 
         
      const createAdData: Prisma.AdCreateInput = {
        name:args.name,
        gameId: args.gameId,
        yearsPlaying: args.yearsPlaying,
        discord:args.discord,
        weekDays: args.weekDays,
        hourStart: newHourStart,
        hourEnd: newHourEnd,
        useVoiceChannel:args.useVoiceChannel,
      }
      await prismaClient.ad.create({
        data: createAdData
      })
    }
  }
};   

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

startStandaloneServer(server,{
  listen: {port: 4000}
} ).then(({url})=>{

  console.log(`????  Server ready at: ${url}`);
});