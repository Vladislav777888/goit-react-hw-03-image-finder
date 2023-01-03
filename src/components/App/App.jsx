import React, { Component } from 'react';
// import axios from 'axios';

import { STATUS } from '../../constants';
import { getPosts, PER_PAGE as paginationLimit } from '../../services';
import { Wrapper } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Loader } from '../Loader';
import { NotFound } from '../ImageGallery/NotFound';
import { Button } from '../Button';
import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    posts: [],
    status: STATUS.idle,
    search: '',
    page: 1,
    isModalOpen: false,
    modalId: null,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page, posts } = this.state;

    const q = search;

    try {
      if (prevState.search !== search || prevState.page !== page) {
        this.setState({ status: STATUS.loading });
      }

      if (prevState.search !== search) {
        const data = await getPosts({ page, q });

        if (!data.totalHits) {
          throw new Error('We have nothing for this search');
        }

        this.setState({
          posts: [
            ...data.hits.map(({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            }),
          ],
          status: STATUS.success,
        });

        return;
      }

      if (prevState.page !== page && page !== 1) {
        const data = await getPosts({ page, q });

        this.setState({
          posts: [
            ...prevState.posts,
            ...data.hits.map(({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            }),
          ],
          status: STATUS.success,
        });

        if (
          data.totalHits === posts.length ||
          data.hits.length < paginationLimit
        ) {
          throw new Error('You loaded all posts');
        }

        return;
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.error });
    }
  }

  handleSubmit = searchValue => {
    this.setState(prevState => {
      if (prevState.search === searchValue) {
        return;
      }
      return { search: searchValue, page: 1, posts: [] };
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = id => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      modalId: id,
    }));
  };

  render() {
    const { posts, status, isModalOpen, modalId } = this.state;

    return (
      <Wrapper>
        {isModalOpen && (
          <Modal
            onClose={this.handleImageClick}
            posts={posts}
            modalId={modalId}
          />
        )}

        <Searchbar onSubmit={this.handleSubmit} />
        {posts.length > 0 && (
          <ImageGallery posts={posts} onClick={this.handleImageClick} />
        )}

        {posts.length === 0 && status === STATUS.error && <NotFound />}

        {status === STATUS.success && <Button onClick={this.handleLoadMore} />}

        {status === STATUS.loading && <Loader />}
      </Wrapper>
    );
  }
}
