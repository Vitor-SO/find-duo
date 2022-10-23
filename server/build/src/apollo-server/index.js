"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const client_1 = require("@prisma/client");
const convert_hour_string_to_hour_1 = require("../utils/convert_hour_string_to_hour");
const convert_hour_to_hour_string_1 = __importDefault(require("../utils/convert_hour_to_hour_string"));
const prismaClient = new client_1.PrismaClient();
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
    Query: {
        ad: async () => {
            return await prismaClient.ad.findMany();
        },
        game: async () => {
            return await prismaClient.game.findMany({
                include: {
                    _count: {
                        select: {
                            ads: true
                        }
                    }
                }
            });
        },
        discordById: async (_, args) => {
            return await prismaClient.ad.findUniqueOrThrow({
                select: {
                    discord: true
                },
                where: {
                    id: args.id
                }
            });
        },
        adsByGame: async (_, args) => {
            const adResponse = await prismaClient.ad.findMany({
                select: {
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
            });
            const newAd = adResponse.map(ad => {
                return {
                    ...ad,
                    hourStart: (0, convert_hour_to_hour_string_1.default)(ad.hourStart),
                    hourEnd: (0, convert_hour_to_hour_string_1.default)(ad.hourEnd)
                };
            });
            return newAd;
        },
    },
    Mutation: {
        async createAd(_, args) {
            let newHourStart = (0, convert_hour_string_to_hour_1.convertHourStringToHour)(args.hourStart);
            let newHourEnd = (0, convert_hour_string_to_hour_1.convertHourStringToHour)(args.hourEnd);
            const createAdData = {
                name: args.name,
                gameId: args.gameId,
                yearsPlaying: args.yearsPlaying,
                discord: args.discord,
                weekDays: args.weekDays,
                hourStart: newHourStart,
                hourEnd: newHourEnd,
                useVoiceChannel: args.useVoiceChannel,
            };
            await prismaClient.ad.create({
                data: createAdData
            });
        }
    }
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 }
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
