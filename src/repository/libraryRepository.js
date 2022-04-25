import axios from '../custom-axios/axios';

const libraryService = {
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchBooks: () => {
        return axios.get("/books",
            {
                params:{
                    size:5
                }
            });
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },

    reserveBook: (id) =>
    {
        return axios.post(`/books/copies/${id}`)
    },

    addBook: (name, category, author,availableCopies) => {
        return axios.post("/books/add", {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies
        });
    },
    editBook: (id,name, category, author,availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies
        });
    },

    getBook: (id) => {
        return axios.get(`/books/${id}`);
    }
}

export default libraryService;
