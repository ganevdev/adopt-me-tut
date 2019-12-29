import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import React, { Component } from 'react';

import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
import ThemeContext from './ThemeContext';

class Details extends Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    // throw new Error('error for tests');
    pet.animal(this.props.id).then(({ animal }) => {
      console.log(animal.photos);
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${
          animal.contact.address.state
        }`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1 style={{ textAlign: 'center' }}>loading...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {themeHook => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: themeHook[0] }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like adopt {name}?</h1>
              <div className="button">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No, I am a moster</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
