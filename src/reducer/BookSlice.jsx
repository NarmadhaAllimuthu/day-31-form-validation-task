
import { createSlice } from "@reduxjs/toolkit";



//redux used and actions and state are updating here that we dispatch in component file where we want


export const bookSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        author: [],
        selectedUser: null,
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
            return state
        },
        setAuthors: (state, action) => {
            state.author = action.payload
            return state
        },
        deleteBookFromList: (state, action) => {
            const getId = action.payload;
            state.books = state.books.filter((user) => user.id != getId)

        }, viewBookList: (state, action) => {
            const viewUser = action.payload;
            state.selectedUser = state.books.find((user) => user.id == viewUser)
        },
        editBookList: (state, action) => {
            const editedUser = action.payload;
            state.books = state.books.map((user) =>
                user.id === editedUser.id ? editedUser : user
            )

        },
        addBookList: (state, action) => {
            state.books = [...state.books, action.payload]
        },

        deleteAuthorFromList: (state, action) => {
            const getId = action.payload;
            state.author = state.author.filter((user) => user.authorid != getId)

        }, viewAuthorList: (state, action) => {
            const viewUser = action.payload;
            state.selectedUser = state.author.find((user) => user.authorid == viewUser)
        },
        editAuthorList: (state, action) => {
            const editedUser = action.payload;
            state.author = state.author.map((user) =>
                user.id === editedUser.authorid ? editedUser : user
            )

        },
        addAuthorList: (state, action) => {
            state.author = [...state.author, action.payload]
        },
        updateLocalAuthor: (state, action) => {
            const updatedAuthor = action.payload;
            const index = state.author.findIndex(user => user.authorid === updatedAuthor.authorid);

            if (index !== -1) {
                state.author[index] = updatedAuthor;
            }
        },
    }
})




export const { setBooks, setAuthors, deleteBookFromList, viewBookList, editBookList, editAuthorList,
    addBookList, addAuthorList, deleteAuthorFromList, viewAuthorList, updateLocalAuthor } = bookSlice.actions
