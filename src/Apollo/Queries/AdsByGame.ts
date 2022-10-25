import { gql } from '@apollo/client';

export const AdsByGame = gql`
  query AdsByGame($id: ID!) {
  adsByGame(id: $id) {
    id
    name
    gameId
    yearsPlaying
    discord
    weekDays
    hourStart
    hourEnd
    useVoiceChannel
    createAt
  }
}
`;