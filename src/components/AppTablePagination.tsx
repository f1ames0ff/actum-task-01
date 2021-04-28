import React from "react";
import { Pagination } from "react-bootstrap";
import { appStore } from "../store/store";
import { searchThunk } from "../store/reducers/search.reducer";
import { UserSearchPayload } from "../types/search-user-payload.interface";
import { ITEMS_PER_PAGE } from "../contants";
import { setPage } from "../store/reducers/pagination.reducer";


export default class AppTablePagination extends React.Component {
  get currentPage() {
    return appStore.getState().paginationReducer.value;
  }

  get itemCount(): number {
    return appStore.getState().searchReducer.total ?? 0;
  }

  get pageCount(): number {
    const count = Math.ceil(this.itemCount / ITEMS_PER_PAGE);

    // because of the API limit for non-organization users
    return count < 100 ? count : 100;
  }

  get paginationItems() {
    return (
      <React.Fragment>
        <Pagination.First onClick={e => this.getPage(1)}/>

        {
          this.currentPage > 1 &&
          <Pagination.Prev onClick={e => this.previousPage()}/>
        }

        {
          this.currentPage > 2 &&
          <Pagination.Item onClick={e => this.getPage(this.currentPage - 1)}>
            {this.currentPage - 1}
          </Pagination.Item>
        }

        <Pagination.Item active>{this.currentPage}</Pagination.Item>

        {
          this.currentPage < this.pageCount - 1 &&
          <Pagination.Item onClick={e => this.getPage(this.currentPage + 1)}>
            {this.currentPage + 1}
          </Pagination.Item>
        }

        {
          this.currentPage < this.pageCount &&
          <Pagination.Next onClick={e => this.nextPage()}/>
        }

        <Pagination.Last onClick={e => this.getPage(this.pageCount)}/>
      </React.Fragment>
    )
  }

  render() {
    return (
      <>
        {
          this.itemCount > 0 &&
          <Pagination className="justify-content-center">

            {this.paginationItems}

          </Pagination>
        }
      </>
    );
  };

  private getPage(index: number = 1) {
    const payload: UserSearchPayload = {
      page: index.toString()
    };

    appStore.dispatch(searchThunk(payload))
      .then(() => {
        appStore.dispatch(setPage(index));
      })
      .catch(e => {
        console.log(`Unable to load page ${index}`);
      });
  }

  private previousPage() {
    const newIndex = this.currentPage - 1;

    if (this.currentPage > 1) this.getPage(newIndex);
  }

  private nextPage() {
    const newIndex = this.currentPage + 1;

    if (this.currentPage < this.itemCount) this.getPage(newIndex);
  }
}
