import { gql } from '@apollo/client'


export const ALL_COUNTRIES = gql`
  query AllCountries($offset: Int, $max: Int, $order: String) {
    countries(start: $offset, limit: $max, sort: $order) {
      id
      title
      Timezone
      slug
      image {
        id
        url
      }
    }
  }
`
