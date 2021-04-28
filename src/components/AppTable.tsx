import React from "react";
import { Card, Image, Table } from "react-bootstrap";
import { User } from "../types/user.interface";
import AppTablePagination from "./AppTablePagination";
import { Unsubscribe } from "@reduxjs/toolkit";
import { appStore } from "../store/store";


interface State {
  page: number
  users: User[]
}

export default class AppTable extends React.Component<unknown, State> {
  state = {
    page: 1,
    users: []
  };
  private storeUnsub: Unsubscribe;

  constructor(props: any) {
    super(props);

    this.storeUnsub = appStore.subscribe(() => {
      const { items: users } = appStore.getState().searchReducer;

      this.setState({ users });
    });
  }

  get rows() {
    const avatarSize = 32;

    return this.state.users.map(({ id, login, avatar_url }) => (
      <tr>
        <td width='10%'>{id}</td>
        <td width='10%'>
          <Image src={avatar_url}
                 roundedCircle
                 width={avatarSize}
                 height={avatarSize}/>
        </td>
        <td>{login}</td>
      </tr>
    ));
  }

  get totalResults() {
    return appStore.getState().searchReducer.total;
  }

  componentWillUnmount() {
    this.storeUnsub();
  }

  render() {
    return (
      <Card>
        <Card.Body>
          {
            this.totalResults > 1 &&
            <Card.Title>
              <h5>Total results: {this.totalResults}</h5>
            </Card.Title>
          }

          <Card.Text>
            {
              this.rows.length > 0
                ? this.getResultsTable()
                : <h4>No results</h4>
            }
          </Card.Text>

          <Card.Footer>
            <AppTablePagination/>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }

  private getResultsTable() {
    return (
      <Table striped
             bordered
             hover
             size="sm">

        <thead>
        <tr>
          <th>#ID</th>
          <td></td>
          <th>Login</th>
        </tr>
        </thead>

        <tbody>
        {this.rows}
        </tbody>

      </Table>
    );
  }
}
