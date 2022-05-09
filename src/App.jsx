import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import KonyvCard from './KonyvCard';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            newBook: {
                title: "",
                author: "",
                publish_year: "",
                page_count: ""
            },
            errors: ""
        }
    }

    componentDidMount() {
        this.listBooks();
    }

    listBooks = () => {
        fetch("http://localhost:8000/api/books").then(async response => {
            if (response.status === 200) {
                const data = await response.json();
                this.setState({
                    books: data.data
                })
            }
        })
    }

    titleInput = (event) => {
        const newTitle = event.target.value;
        const { newBook} = this.state;
        this.setState({
            newBook: {
                title: newTitle,
                author: newBook.author,
                publish_year: newBook.publish_year,
                page_count: newBook.page_count
            }
        })
    }

    authorInput = (event) => {
        const newAuthor = event.target.value;
        const { newBook} = this.state;
        this.setState({
            newBook: {
                title: newBook.title,
                author: newAuthor,
                publish_year: newBook.publish_year,
                page_count: newBook.page_count
            }
        })
    }

    publish_yearInput = (event) => {
        const newPublish_year = event.target.value;
        const { newBook} = this.state;
        this.setState({
            newBook: {
                title: newBook.title,
                author: newBook.author,
                publish_year: newPublish_year,
                page_count: newBook.page_count
            }
        })
    }

    page_countInput = (event) => {
        const newPage_count = event.target.value;
        const { newBook} = this.state;
        this.setState({
            newBook: {
                title: newBook.title,
                author: newBook.author,
                publish_year: newBook.publish_year,
                page_count: newPage_count
            }
        })
    }

    creatNewBook = () => {
        const { newBook } = this.state;
        fetch("http://localhost:8000/api/books", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
        },
        body: JSON.stringify(newBook)
        }).then(async response => {
            if (response.status === 201) {
                this.setState({
                    newBook: {
                        title: "",
                        author: "",
                        publish_year: "",
                        page_count: ""
                    }
                });
                this.listBooks();
            } else {
                const data = await response.json();
                this.setState({
                    errors: data.message,
                });
            }
        })
    }

    render() {
        const { books, newBook, errors } = this.state;
        const cardList = [];
        books.forEach(book => {
            cardList.push(<KonyvCard book={book} key={book.id} />)
        });

        const errorAlert = <div className='alert alert-danger'>
            {errors}
        </div>;

        return (
            <div className='container'>
                <header>
                    <nav className="navbar navbar-expand">
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <a href="#konyv_form" className='nav-link'>Új könyv felvétele</a>
                                <a href="https://petrik.hu/" className='nav-link'>Petrik honlap</a>
                            </li>
                        </ul>
                    </nav>
                    <h1>
                        Petrik Könyvtár Nyilvántartó
                    </h1>
                </header>


                <main className='mt-3 mb-3'>
                    <section className='row'>
                        {cardList}
                    </section>

                    <section id='konyv_form'>
                        <h2>Új könyv felvétele</h2>
                        {errors !== "" ? errorAlert : ""}
                        <div className="mb-3">
                            <label htmlFor="title">Cím:</label>
                            <input type="text" name="title" id="title" placeholder="Cím" 
                            className='form-control' value={newBook.title} onInput={this.titleInput} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="author">Szerző:</label>
                            <input type="text" name="author" id="author" placeholder="Szerző" 
                            className='form-control' value={newBook.author} onInput={this.authorInput} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="publish_year">Cím:</label>
                            <input type="number" name="publish_year" id="publish_year" placeholder="Kiadás éve:" 
                            className='form-control' value={newBook.publish_year} onInput={this.publish_yearInput} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="page_count">Oldalak száma:</label>
                            <input type="number" name="page_count" id="page_count" placeholder="Hossz:" 
                            className='form-control' value={newBook.page_count} onInput={this.page_countInput} />
                        </div>
                        <button className='btn btn-primary' onClick={this.creatNewBook}>Új könyv</button>
                    </section>
                </main>

                <footer>
                    Készítette: Balaska Klaudia
                </footer>
            </div>
        );
    }
}

export default App;