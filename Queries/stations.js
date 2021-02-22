import { gql } from '@apollo/client'


export const QUERY_ALL_STATIONS = gql`
  query QueryAllStations(
    $offset: Int
    $max: Int
    $order: String
    $where: JSON
  ) {
    stations(start: $offset, limit: $max, sort: $order, where: $where) {
      id
      title
      streamuri
      country {
        id
        title
        Timezone
      }
      image {
        id
        url
      }
      about
      premium
      featured
      available
      presenters(limit: 1) {
        id
        title
      }
      slug
    }
  }
`
