import { gql } from '@apollo/client';

export const GAME = gql`
  query Game {
    game {
      id
      title
      bannerUrl
      _count
    }
  }
`;