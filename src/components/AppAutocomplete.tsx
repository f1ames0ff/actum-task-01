import './AppAutocomplete.scss';
import React from "react";
import TextInput from "react-autocomplete-input";
import { Container } from "react-bootstrap";
import { appStore } from "../store/store";
import { UserSearchPayload } from "../types/search-user-payload.interface";
import { setPage } from "../store/reducers/pagination.reducer";
import { saveSearchString, searchThunk } from "../store/reducers/search.reducer";
import { User } from "../types/user.interface";

// Simple autocomplete for this test task :)
export default class AppAutocomplete extends React.Component {
  props = {
    inputBehavior: false,
    behaviorActive: true,
  };
  state = {
    searchStr: '',
    users: [] as User[],
    isLoading: false,
    isFocused: false
  };

  private timers: {
    debounce?: number,
    throttle?: number,
  } = {
    debounce: undefined,
    throttle: undefined,
  };
  private searchOptions = [
    'name',
    'language',
    'location'
  ];
  private delay = 500; // ms


  get searchInputEmpty() {
    return this.state.searchStr.length === 0;
  }

  get listItems() {
    const { users } = this.state;

    return users.map(user => (
      <li key={user.id}
          className="list-group-item">
        <span className="name">{user.login}</span>
      </li>
    ));
  }


  render() {
    return (
      <div className="app-autocomplete">
        <TextInput className="form-control"
                   id="mainInput"
                   Component="input"
                   trigger={['$']}
                   options={this.searchOptions}
                   placeholder="Search github users"
                   value={this.state.searchStr}
                   onChange={(value: string) => this.handleSearchChange(value)}
                   onSelect={(value: string) => this.onSelectOperator(value)}
                   onFocus={() => this.onFocus()}
                   onBlur={() => this.onBlur()}/>

        {
          this.state.isLoading &&
          <div className="spinner-border app-autocomplete-spinner"
               role="status">
            <span className="visually-hidden"/>
          </div>
        }

        {
          !this.searchInputEmpty && this.state.isFocused &&
          <Container className="app-autocomplete-list p-0">
            <ul className="list-group">
              {this.listItems}
            </ul>
          </Container>
        }
      </div>
    )
  }

  private handleSearchChange(value: string) {
    this.setState({ searchStr: value ?? '' });
    appStore.dispatch(saveSearchString(value));

    if (!this.props.behaviorActive) return;

    // Debounce
    if (this.props.inputBehavior) {
      if (this.timers.debounce !== undefined)
        clearTimeout(this.timers.debounce);

      this.timers.debounce = window.setTimeout(() => {
        this.dispatchSearch();
        clearTimeout(this.timers.debounce);
        delete this.timers.debounce;
      }, this.delay);
    }
    // Throttle
    else {
      if (this.timers.throttle !== undefined) return;

      this.timers.throttle = window.setTimeout(() => {
        this.dispatchSearch();
        clearTimeout(this.timers.throttle);
        delete this.timers.throttle;
      }, this.delay);

    }
  }

  private onSelectOperator(value: string) {
    let trimmed = value
      .slice(0, value.length - 1)
      .replaceAll(/\$/g, '');

    this.setState({ searchStr: `${trimmed}:` });
  }

  private dispatchSearch() {
    const payload: UserSearchPayload = { q: this.state.searchStr };

    if (this.searchInputEmpty) return;

    this.setState({ isLoading: true });

    appStore.dispatch(setPage(1));
    appStore.dispatch(searchThunk(payload)).then(() => {
      this.setState({
        users: appStore.getState().searchReducer.items,
        isLoading: false
      });
    });
  }

  private onFocus() {
    this.setState({ isFocused: true });
  }

  private onBlur() {
    this.setState({ isFocused: false });
  }
}
