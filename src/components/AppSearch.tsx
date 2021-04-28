import './AppSearch.scss';
import React, { FormEvent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { appStore } from "../store/store";
import { searchThunk } from "../store/reducers/search.reducer";
import { UserSearchPayload } from "../types/search-user-payload.interface";
import { setPage } from "../store/reducers/pagination.reducer";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

export default class AppSearch extends React.Component {
  state = { searchStr: '' };
  private searchOptions = [
    'name',
    'language',
    'location'
  ];
  private textInputRef = React.createRef();

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Text>
            <Form onSubmit={e => this.search(e)}>

              <Row className="autocomplete-input-wrapper">
                <Col className="col-12">
                  <TextInput ref={this.textInputRef}
                             className="form-control"
                             style={{
                               borderTopRightRadius: 0,
                               borderBottomRightRadius: 0,
                               borderRight: 'none'
                             }}
                             Component="input"
                             trigger={['$']}
                             options={this.searchOptions}
                             placeholder="Search github user"
                             value={this.state.searchStr}
                             onChange={(e: string) => this.handleSearchChange(e)}
                             onSelect={(e: any) => this.onSelectOperator(e)}/>

                  <Button variant="outline-primary"
                          type="submit"> Search </Button>
                </Col>
              </Row>

              <Form.Text className="text-muted">
                You can search a github user by typing a name or by
                using special operators: <b>$name:</b>, <b>$language</b> and <b>$location</b>
              </Form.Text>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  private handleSearchChange(value: string) {
    this.setState({ searchStr: value ?? '' });
  }

  private onSelectOperator(value: string) {
    let trimmed = value
      .slice(0, value.length - 1)
      .replaceAll(/\$/g, '');

    this.setState({ searchStr: `${trimmed}:` });
  }

  private search(event: FormEvent) {
    const payload: UserSearchPayload = { q: this.state.searchStr };

    appStore.dispatch(setPage(1));
    appStore.dispatch(searchThunk(payload));

    event.preventDefault();
  }
}
