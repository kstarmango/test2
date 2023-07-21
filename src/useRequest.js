import { GraphQLClient, gql } from "graphql-request";

const project_id = process.env.PROJECT_ID
// const API_URL = `https://graphqlzero.almansi.me/api`;
// const API_URL = `https://api.mocki.io/v2/c4d7a195/graphql`;
const API_URL1 = `https://rickandmortyapi.com/graphql`;
const API_URL2 = `https://countries.trevorblades.com/graphql`;
const API_URL3 = `https://right-chigger-92.hasura.app/v1/graphql`;

export const graphQLClient1 = new GraphQLClient(API_URL1, {
  // method:"POST",
  // headers: {
  //   Authorization: `Bearer 62d550d12bc74817a56241e789b0d0ca`
  // }
});
export const graphQLClient2 = new GraphQLClient(API_URL2, {});
export const graphQLClient3 = new GraphQLClient(API_URL3, {
  method:"POST",
  headers: {
    Authorization: `EFd4mYVEoq5DwunxQ0nAt0SBfiuK26usYz5aQNeuq40om9urd0FAz89VkVWw3Vqf`
  }
});

export const Queries = {
  getCharacters: async (id) => {
    const query = gql`
      query Characters($name: String) {
        characters(filter: { name: $name }) {
          results {
            name
            species
            status
            type
            gender
            origin {name}
            location {name}
            image
          }
        }
      }
    `;
    const characters = await graphQLClient1.request(query, { "name": id.queryKey[1] });
    return characters;
  },
  filterContinents: async (filter) => {
    const query = gql`
      query Continents($filter:ContinentFilterInput){
        continents(filter:$filter){
          code
        }
      }
    `;
    const Continents = await graphQLClient2.request(query, { "filter": filter.queryKey[1]});
    return Continents;
  },
  
}