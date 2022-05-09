import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            success: false
        };
    }

    rent = () => {
        const { book } = this.props;
        fetch(`http://localhost:8000/api/books/${book.id}/rent`, {
            method: "POST",
            headers: {
                "Accept" : "application/json"
            }
        }).then(async response => {
            if (response.status === 201) {
                this.setState({
                    success: true,
                    errors: ""
                });
            } else {
                const data = await response.json();
                this.setState({
                    errors: data.message,
                    success: false
                });
            }
        })
    };

    render() { 
        const { book } = this.props;
        const { success, errors} = this.state;
        return (
            <div className='col-sm-12 col-md-6 col-lg-4 card'>
                <div className="card-body">
                    <h2>{book.title}</h2>
                    <h2>{book.author}</h2>
                    <p>Kiadás éve: {book.publish_year}</p>
                    <p>Hossz: {book.page_count} oldal</p>
                    <img src={`szerzok/${book.author}.jpg`} alt={book.author} className="img-fluid" />
                    <div className='d-grid gap-2'>
                    <button className="btn btn-primary mt-3" onClick={this.rent}>Kölcsönzés</button>
                    </div>
                    <p>
                        {success ? "Sikeres foglalás!" : errors !== "" ? errors : ""}
                    </p>
                    </div>
            </div>
        );
    }
}
 
export default App;