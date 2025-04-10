import React from 'react';
import styled from 'styled-components';

const Premium = () => {
  return (
    <>
      <h4 className='premium_head'>Subscribe now and start streaming</h4>
      <StyledWrapper className='premium' style={{ height: '100vh' }}>
        <div className="cards__inner">
          <div className="cards__card card">
            <p className="card__heading">Basic</p>
            <p className="card__price">$10/month</p>
            <ul className="card_bullets flow" role="list">
              <li>Watch Live sports</li>
              <li>Daily Sports news</li>
              <li>Live chat </li>
            </ul>
            <a className="card__cta cta" href="#basic">Get Started</a>
          </div>
        </div>
        {/* Card 2 */}
        <div className="cards__inner">
          <div className="cards__card card">
            <p className="card__heading">Premium</p>
            <p className="card__price">$49/month</p>
            <ul className="card_bullets flow" role="list">
              <li>Access to all features</li>
              <li>High quality streaming</li>
              <li>No ads</li>
            </ul>
            <a className="card__cta cta" href="#basic">Get Started</a>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;

  .cards__inner {
    flex: 1 1 300px;
    max-width: 400px;
    display: flex;
    justify-content: center;
  }

  .card {
    --flow-space: 0.5em;
    flex: 1;
    padding: 1.5em 2em;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    align-items: start;
    gap: 1.25em;
    color: #eceff1;
    background-color: #2b2b2b;
    border: 1px solid #eceff133;
    border-radius: 15px;
    width: 100%;
  }

  .card__bullets {
    line-height: 1.4;
  }

  .card__heading {
    font-size: 1.25em;
    font-weight: 600;
  }

  .card__price {
    font-size: 1.75em;
    font-weight: 700;
  }

  .flow > * + * {
    margin-top: var(--flow-space, 1.25em);
  }

  .cta {
    display: block;
    align-self: end;
    margin: 1em 0 0.5em 0;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background-color: transparent;
    outline: 1px solid white;
    padding: 0.7em;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
  }

  .card:hover {
    --lightness: 80%;
    background: #ffffff80;
    color: #000;
    outline: 1px solid rgb(255, 255, 255);
    box-shadow: inset 0 0 80px whitesmoke, inset 20px 0 80px rgba(255, 0, 255, 0.747),
      inset -20px 0 80px #0ff, inset 20px 0 300px #f0f, inset -20px 0 300px #0ff,
      0 0 50px #fff, -10px 0 80px #f0f, 10px 0 80px #0ff;
    transition: all ease-in-out 0.3s;
  }

  .card:hover > .cta {
    outline: none;
    background-color: #0d0d0d;
  }

  @media (max-width: 768px) {
  .premium_head{
  margin-left: 10px;
}
    .cards__inner {
      max-width: 100%;
    }

    .card {
      padding: 1rem;
      font-size: 0.9rem;
    }

    .card__price {
      font-size: 1.5em;
    }

    .card__heading {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
  .premium_head{
  margin-left: 10px;
}
    .cards__inner {
      flex: 1 1 100%;
    }

    .card {
      padding: 0.8rem;
    }

    .card__price {
      font-size: 1.25em;
    }

    .card__heading {
      font-size: 0.9em;
    }

    .cta {
      padding: 0.5em;
      font-size: 0.8rem;
    }
  }
`;

export default Premium;