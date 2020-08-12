import React,{Component} from 'react';
import axios from 'axios';
import "./style.css"
import {
        Input,
        FormGroup,
        Label,
        Button,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter
       } from 'reactstrap';


class ViewBook extends Component{
  state={
    Books:[] ,
    search:"",
    ipa: "http://35.223.87.127:80/Books/",
    addBookDetails:
    {
      title:'',
      author:'',
      isbn:'',
      publicationDate:'',
      publisher:'',
      price:'',
      genre:'',
      format:''
    },
    editBookDetails:{
      id:'',
      title:'',
      author:'',
      isbn:'',
      publicationDate:'',
      publisher:'',
      price:'',
      genre:'',
      format:''
    },
    checkNew: false,
    checkEdit: false
    
  }


  componentWillMount()
  {
          try{
    axios.get(this.state.ipa).then(
      (response)=>{
      this.setState({ Books:response.data})
      })
          }
          catch(error){
          console.log(error);
          }
  }
  

  togglecheckNew() 
  {
    this.setState({checkNew:!this.state.checkNew});
  }


  togglecheckEdit() 
  {
    this.setState({checkEdit:!this.state.checkEdit});
  }


  addBook()
  {
          try{
    axios.post(this.state.ipa, this.state.addBookDetails).then((response)=>
    {
      let{Books}=this.state;
      Books.push(response.data);
      this.setState(
        {
          Books,checkNew:false,
          addBookDetails:
            {
              title:'',
              author:'',
              isbn:'',
              publicationDate:'',
              publisher:'',
              price:'',
              genre:'',
              format:''
            },
        });
    });
          }
          catch(error){
          console.log(error);
          }
  }


  deleteBook(id)
  {
          try{
    axios.delete(this.state.ipa +id).then((response)=>
    {
      this._refreshBooks();
    });}
          catch(error){
          console.log(error);
          }
  }


  updateBook()
  {
    let
    {
      title,
      author,
      isbn,
      publicationDate,
      publisher,
      price,
      genre,
      format
    }=this.state.editBookDetails;
          try{
    axios.put(this.state.ipa +this.state.editBookDetails.id,
    {
      title,
      author,
      isbn,
      publicationDate,
      publisher,
      price,
      genre,
      format}).then((response)=>
      {
        this._refreshBooks();
        this.setState({checkEdit:false,editBookDetails:
        {
          id:'', 
          title:'',
          author:'',
          isbn:'',
          publicationDate:'',
          publisher:'',
          price:'',
          genre:'',
          format:''
        }
      })
    });}
          catch(error){
          console.log(error);
          }
  }
    
  
  editBook
  (
    id,
    title,
    author,
    isbn,
    publicationDate,
    publisher,
    price,
    genre,
    format
  )
  {
    this.setState(
    {
      editBookDetails : 
    {
      id,
      title,
      author,
      isbn,
      publicationDate,
      publisher,
      price,
      genre,
      format
    },
    checkEdit:!this.state.checkEdit});
  }


  _refreshBooks()
  {
          try{
    axios.get(this.state.ipa).then((response)=>
    {
      this.setState({
      Books:response.data
      })
    });}
          catch(error){
          console.log(error);
          }
  }


  updateSearch(event) 
  {
    this.setState(
      { 
        search: event.target.value.substr(0, 20) 
      });
  }


  render()
  {
    let filteredBook = this.state.Books.filter(book1 => {
      return (
        book1.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    let Bookss=filteredBook.map((item)=>
    {
      return(
        
        <div id="main" key={item.id}>
          <div className="container">
            <div className="card" id="now">
              <div className="card-body" >
               
                  <dt className="col-12">ISBN</dt>
                  <dd className="col-12">{item.isbn}</dd>
                  <dt className="col-12">Book Title</dt>
                  <dd className="col-12">{item.title}</dd>
                  <dt className="col-12">Book Author</dt>
                  <dd className="col-12">{item.author}</dd>
                  <dt className="col-12">Genre</dt>
                  <dd className="col-12">{item.genre}</dd>
                  <dt className="col-12">Publication Date</dt>
                  <dd className="col-12">{item.publicationDate}</dd>
                  <dt className="col-12">Publisher</dt>
                  <dd className="col-12">{item.publisher}</dd>
                  <dt className="col-12">Format</dt>
                  <dd className="col-12">{item.format}</dd>
                  <dt className="col-12">Price</dt>
                  <dd className="col-12">{item.price}</dd>
                  <Button id="updateButton"  className="mr-2" onClick={this.editBook.bind(this,item.id,item.title,item.author,item.isbn,item.publicationDate,item.publisher,item.price,item.genre,item.format)}><strong>Update</strong></Button>
                 <Button id="deleteButton"  onClick={this.deleteBook.bind(this,item.id)}>Delete</Button>
             
              </div>
            </div>
          </div>
        </div> 
      )
    });
    return(
    <div>
      <div>
      <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="Navbar">
            <a className="navbar-brand mr-auto" href="#"><span className="fa fa-user-circle"></span>  REACT BOOK LIBRARY</a>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active"><a className="nav-link" href="/viewbook"><span className="fa fa-home fa-lg"></span> View Book</a></li>
                <Button id="addButton" onClick={this.togglecheckNew.bind(this)}>Add book</Button>
                  <div>
                    <input
                      type="text"
                      className="search"
                      onChange={this.updateSearch.bind(this)}
                      placeholder="Search..."
                    />
                  </div>
                </ul>
          </div>
        </div>
      </nav>
      
      <div className="App Container">
        <Modal isOpen={this.state.checkNew} toggle={this.togglecheckNew.bind(this)} >
          <ModalHeader toggle={this.togglecheckNew.bind(this)}>Add a New Book</ModalHeader>
            <ModalBody>
              <FormGroup>  
                  <Label for="title">Book Title </Label>
                  <Input id="title" value={this.state.addBookDetails.title} onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.title=e.target.value;
                    this.setState({addBookDetails});
                  }}/>

                  <Label for="author">Author </Label>
                  <Input id="author" value={this.state.addBookDetails.author} onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.author=e.target.value;
                    this.setState({addBookDetails});
                  }}/>

                  <Label for="isbn">ISBN Number</Label>
                  <Input id="isbn"value={this.state.addBookDetails.isbn} onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.isbn=e.target.value;
                    this.setState({addBookDetails});
                  }}/>

                  <Label for="publicationDate">Date of Publication </Label>
                  <Input id="publicationDate"value={this.state.addBookDetails.publicationDate} onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.publicationDate=e.target.value;
                    this.setState({addBookDetails});
                  }}/>
                  
                  <Label for="price">Price</Label>
                  <Input id="price"value={this.state.addBookDetails.price} onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.price=e.target.value;
                    this.setState({addBookDetails});
                  }}/>

                  <Label for="publisher">Publisher </Label>
                  <Input id="publisher" value={this.state.addBookDetails.publisher} onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.publisher=e.target.value;
                    this.setState({addBookDetails});
                  }}/>


                  <Label for="Genre">Genre </Label>
                  <br />
                  <select id="Genre" value={this.state.addBookDetails.genre} 
                  onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.genre=e.target.value;
                    this.setState({addBookDetails});
                  }}>
            
                    <option value="Select">Select</option>
                    <option value="Horror">Horror</option>
                    <option value="Sitcom">Sitcom</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Auto-Biography">Auto-Biography</option>
                   </select>
                  <br/> <br />


                  <Label for="format">Book Format </Label>
                  <br />
                  <select id="format" value={this.state.addBookDetails.format} 
                  onChange={(e)=>{
                    let {addBookDetails}=this.state;
                    addBookDetails.format=e.target.value;
                    this.setState({addBookDetails});
                  }}>
                    <option value="Select">Select</option>
                    <option value="pdf">pdf</option>
                    <option value="doc">doc</option>
                    <option value="epub">epub</option>
                  </select>
                  <br/>
                </FormGroup>
              </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
              <Button color="secondary" onClick={this.togglecheckNew.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.checkEdit} toggle={this.togglecheckEdit.bind(this)} >
          <ModalHeader toggle={this.togglecheckEdit.bind(this)}>Edit Book data</ModalHeader>
            <ModalBody>
              <FormGroup>      
                  <Label for="title">Book Title </Label>
                  <Input id="title" value={this.state.editBookDetails.title} onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.title=e.target.value;
                    this.setState({editBookDetails});
                  }}/>

                  <Label for="author">Book Author </Label>
                  <Input id="author" value={this.state.editBookDetails.author} onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.author=e.target.value;
                    this.setState({editBookDetails});
                  }}/>

                  <Label for="isbn">ISBN Number</Label>
                  <Input id="isbn"value={this.state.editBookDetails.isbn} onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.isbn=e.target.value;
                    this.setState({editBookDetails});
                  }}/>

                  <Label for="publicationDate">Date of Publication </Label>
                  <Input id="publicationDate"value={this.state.editBookDetails.publicationDate} onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.publicationDate=e.target.value;
                    this.setState({editBookDetails});
                  }}/>

                   <Label for="publisher">Publisher </Label>
                  <Input id="publisher"value={this.state.editBookDetails.publisher} onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.publisher=e.target.value;
                    this.setState({editBookDetails});
                  }}/>

                  <Label for="price">Price</Label>
                  <Input id="price"value={this.state.editBookDetails.price} onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.price=e.target.value;
                    this.setState({editBookDetails});
                  }}/>
                  <Label for="Genre">Genre </Label>
                  <br />
                  
                  <select id="Genre" value={this.state.editBookDetails.genre} 
                  onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.genre=e.target.value;
                    this.setState({editBookDetails});
                  }}>
                    <option value="Select">Select</option>
                    <option value="Horror">Horror</option>
                    <option value="Sitcom">Sitcom</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Auto-Biography">Auto-Biography</option>
                  </select>
                  <br /><br />


                  <Label for="format">Book Format </Label>
                  <br />
                  <select id="format" value={this.state.editBookDetails.format} 
                  onChange={(e)=>{
                    let {editBookDetails}=this.state;
                    editBookDetails.format=e.target.value;
                    this.setState({editBookDetails});
                  }}>

                    <option value="Select">Select</option>
                    <option value="pdf">pdf</option>
                    <option value="doc">doc</option>
                    <option value="epub">epub</option>
                  </select>
                </FormGroup>
            </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
            <Button color="danger" onClick={this.togglecheckEdit.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div id="backy">
        {Bookss}
        </div>
      </div>
      <div></div>
      <footer className="footer">
        <div className="container">
                <div className="row">             
                    <div className="col-7 col-sm-5">
                        <h5>Contact Address</h5>
                        <address className="address">
                            Villa No: 105, Concorde Cuppertino<br />
                            Neeladri Road, Elecronic City 1<br />
                            Bangalore, India<br />
                            Mob.: +91-8555909986<br />
                            Email: <a href="haary.richard@wipro.com">haary.richard@wipro.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
            </div>
    </footer>
    </div></div>);
  }
}
export default ViewBook;
