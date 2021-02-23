import gql from 'graphql-tag'

export const GET_POSTS = gql`
  query Posts {
    posts {
      id
      title
      createdAt
      image
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const GET_PAGINATED_POSTS = gql`
  query Posts($pagination: Pagination) {
    posts(pagination: $pagination) {
      id
      title
      createdAt
      image
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const GET_POST = gql`
  query Post($id: Int) {
    post (id: $id) {
      id
      title
      image
      content
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const AUTHENTICATE = gql`
  mutation ($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
`

export const REGISTER = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`

export const UPDATE_POST = gql`
  mutation ($post: PostInput) {
    updatePost(post: $post) {
      id
      title
      content
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const ADD_COMMENT = gql`
  mutation ($postId: Int!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
      postId
      content
      createdAt
    }
  }
`

export const ADD_POST = gql`
  mutation ($post: PostInput) {
    addPost(post: $post) {
      id
      title
      content
      image
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`
