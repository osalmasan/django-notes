import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import ListNotes from './components/ListNotes';

var notes_temp = [
    {
        "id": 1,
        "title": "Django note",
        "content": "asdasfdasdasd",
        "created_at": "2020-02-08T10:13:17.594514Z",
        "updated_at": "2020-02-08T10:13:17.594514Z"
    },
    {
        "id": 2,
        "title": "Python notes",
        "content": "daoijoaushdoasd",
        "created_at": "2020-02-08T10:13:24.960170Z",
        "updated_at": "2020-02-08T10:13:24.960170Z"
    },
    {
        "id": 3,
        "title": "PHP",
        "content": "Dasdasdasosdf",
        "created_at": "2020-02-08T10:13:35.787983Z",
        "updated_at": "2020-02-08T10:13:35.787983Z"
    },
]
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: notes_temp,
      current_note_id: 0,
      is_creating: true
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
  }
  handleItemClick(id) {
      console.log("Id: ", id);
      this.setState((prevState) => {
          return {is_creating: false, current_note_id: id }
      })
  }
  handleAddNote() {
    this.setState((prevState) => {
        return {is_creating: true}
    })
  }
  render() {
    return (
        <React.Fragment>
          <Container>
            <Row>
              <Col xs="10">
                <h2>Realtime Notes</h2>
              </Col>
              <Col xs="2">
                <Button color="primary" onClick={this.handleAddNote}>Create a new Note</Button>
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                  <ListNotes notes={this.state.notes} handleItemClick={(id) => this.handleItemClick(id)} />
              </Col>
              <Col xs="8">
                <p>Content for editing and deleting</p>
                  {
                     this.state.is_creating ?
                         "Creating now..":
                         `Editing note with id: ${this.state.current_note_id}`
                  }
              </Col>
            </Row>
          </Container>
        </React.Fragment>
    );
  }
}

export default App;
