import { gql } from '@apollo/client';

// Create a GET_ME query 
export const GET_ME = gql`
    query me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }`