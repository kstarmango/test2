import { GraphQLClient, gql } from "graphql-request";

const project_id = process.env.PROJECT_ID
// const API_URL = `https://api.takeshape.io/project/c5cee89b-b840-4bd0-9333-59e564895e8d/v3/graphql`;
const API_URL = `https://graphqlzero.almansi.me/api`;

export const graphQLClient = new GraphQLClient(API_URL, {
  // headers: {
  //   Authorization: `Bearer 62d550d12bc74817a56241e789b0d0ca`
  // }
});

export const Queries = {
  fetchPostList : async (options) => {
    const { posts } = await graphQLClient.request(
      gql
        `query($options:PageQueryOptions){
          posts(options:$options){
            data{
              id
              title
            }
            meta{
              totalCount
            }
          }
        }`
      ,{options}
    );
    return posts;
  },
  fetchOnePost : async (postId) => {
    const { getPost } = await graphQLClient.request(
      gql
        `query getPost($postId: ID!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }`
      ,{postId} 
    );
    return getPost;
  },
}