import './AppSearch.scss';
import React, { ChangeEvent, FormEvent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { appStore } from "../store/store";
import { searchThunk } from "../store/reducers/search.reducer";
import { setPage } from "../store/reducers/pagination.reducer";
import 'react-autocomplete-input/dist/bundle.css';
import AppAutocomplete from './AppAutocomplete';
import { UserSearchPayload } from '../types/search-user-payload.interface';


export default class AppSearch extends React.Component {
  state = {
    searchStr: '',
    inputBehavior: false,
    behaviorActive: true,
  };

  get behaviorDescription() {
    if (this.state.inputBehavior)
      return 'debounce';

    else
      return 'throttling';
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Text>
            <Form>

              <Row className="autocomplete-input-wrapper">
                <Col className="col-12">
                  <AppAutocomplete inputBehavior={this.state.inputBehavior}
                                   behaviorActive={this.state.behaviorActive}/>

                  <Button variant="outline-primary"
                          id="searchButton"
                          type="button"
                          onClick={e => this.search(e)}>
                    Search
                  </Button>
                </Col>
              </Row>

              <Form.Text className="text-muted">
                You can search a github user by typing a name or by
                using special operators: <b>$in:</b> (user name),
                <b>$language</b> (reposirory language) and <b>$location</b> (profile location)
              </Form.Text>

              <Row>
                <Col className="col-12 text-left">
                  <div className="form-check">
                    <input className="form-check-input"
                           id="behaviorInput"
                           type="checkbox"
                           disabled={!this.state.behaviorActive}
                           onChange={e => this.inputBehaviorChange(e)}/>

                    <label className="form-check-label"
                           htmlFor="flexCheckDefault">
                      {this.behaviorDescription}
                    </label>
                  </div>

                  <div className="form-check">
                    <input className="form-check-input"
                           id="disableBehaviorInput"
                           type="checkbox"
                           onChange={e => this.behaviorActiveChange(e)}/>

                    <label className="form-check-label"
                           htmlFor="flexCheckDefault">
                      disable autocomplete behavior (use "Search" button)
                    </label>
                  </div>
                </Col>
              </Row>

            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  private inputBehaviorChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.currentTarget;

    this.setState({ inputBehavior: checked });
  }

  private behaviorActiveChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.currentTarget;

    this.setState({ behaviorActive: !checked });
  }

  private dispatchSearch() {
    const { searchString } = appStore.getState().searchReducer;
    const payload: UserSearchPayload = { q: encodeURIComponent(searchString) };

    appStore.dispatch(setPage(1));
    appStore.dispatch(searchThunk(payload));
  }

  private search(event: FormEvent) {
    this.dispatchSearch();
    event.preventDefault();
  }
}
