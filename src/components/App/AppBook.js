import './App.css';
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import {useNavigate} from 'react-router-dom';
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route, Router,
} from "react-router-dom";
import Books from '../Books/BookList/bookList'
import Header from '../Header/header';
import Authors from '../Authors/authors'
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import libraryService from "../../repository/libraryRepository";
import Categories from "../Categories/categories";

class AppBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: [],
            categories: [],
            selectedBooks: {}
        }
    }
    render(){
        return (
            <BrowserRouter>
                <Header></Header>
                <main>
                    <div className="container">
                        <Routes>

                            <Route path="/authors"  element={
                                <Authors authors={this.state.authors}/>}/>
                            <Route path="/categories"  element={
                                <Categories categories={this.state.categories}/>}/>
                            <Route path={"/books/add"} element={
                                <BookAdd categories={this.state.categories}
                                         authors={this.state.authors}
                                         onAddBook={this.addBook}/>}/>
                            <Route path="/books/edit/:id"  element={
                                <BookEdit categories={this.state.categories}
                                          authors={this.state.authors}
                                          onEditBook={this.editBook}
                                          books={this.state.selectedBooks}/>}/>
                            <Route path="/books" element={
                                <Books books={this.state.books}
                                          onDelete={this.deleteBook}
                                          onReserve={this.reserveBook}
                                           onEdit={this.getBook}
                                />}/>
                        </Routes>
                    </div>
                </main>
            </BrowserRouter>);
    }

    componentDidMount() {
        this.loadAuthors();
        this.loadBooks();
        this.loadCategories();
    }

    loadAuthors = () => {
        libraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }
    loadCategories = () => {
        libraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadBooks = () => {
        libraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    deleteBook = (id) => {
        libraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }
    reserveBook = (id) => {
        libraryService.reserveBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name,category, author,availableCopies) => {
        libraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        libraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id,name,category, author,availableCopies) => {
        libraryService.editBook(id, name,category, author,availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }
}

export default AppBook;
