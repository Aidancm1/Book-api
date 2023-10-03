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
// Create a remove_book
