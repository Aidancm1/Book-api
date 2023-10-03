import { gql } from '@apollo/client';

// Crete a login_user,
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!, $username: String!) {
        login(email: $email, password: $password, username: $username) {
            token
            user {
                _id
                username
            }
        }
    }`
// Create a Add_user,
export const ADD_USER = gql`
mutation addUser($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
        token
        user {
            _id
            username
        }
    }
}`
// Create a save_book,
// mutation saveBook(username: String, $bookId: String!, $authors: [String], $description: String!, $title: String!, $image: String!, $link: String!){
export const SAVE_BOOK = gql`saveBook($book: BookInput!){
    saveBook(book: $book)
    user {
        username
        email
        bookData
    }
}`

// Create a remove_book
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`
