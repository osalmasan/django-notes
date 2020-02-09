import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import ListNotes from './components/ListNotes';
import {fetchNotes, fetchNote, addNote, updateNote } from './api';
import AddNoteForm from "./components/AddNoteForm";
import EditNoteForm from "./components/EditNoteForm";
import Websocket from "react-websocket";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      note: {},
      current_note_id: 0,
      is_creating: true,
      is_fetching: true
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSaveNote = this.handleSaveNote.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentDidMount() {
      this.getData();
  }
  async getData() {
    let data = await fetchNotes();
    this.setState({notes: data})
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
  async handleSaveNote(data) {
    await addNote(data);
    await this.getData();
  }
  handleData(data) {
    let result = JSON.parse(data);
    let current_note = this.state.notes;
    if(current_note === result.id){
      this.setState({note: result})
    }
  }
  handleOnChange(e) {
    let content = e.target.value;
    let current_note = this.state.note;
    current_note.content = content;

    this.setState({
      note: current_note
    });
    const socket = this.refs.socket;
    socket.state.ws.send(JSON.stringify(current_note));
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
                  {
                     this.state.is_creating ?
                         <AddNoteForm handleSave={this.handleSaveNote} />:
                         <EditNoteForm handleChange={this.handleOnChange} note={this.state.note} />
                  }
                  <Websocket url='ws://127.0.0.1:8000/ws/notes/'
                  onMessage={this.handleData.bind(this)} />
              </Col>
            </Row>
          </Container>
        </React.Fragment>
    );
  }
}

export default App;
