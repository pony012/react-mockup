import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';

function LoadingCards({ numberOfCards, gutter }) {
  const numSpan = 24 / numberOfCards;
  let count = 1;
  const cards = [];
  while (count <= numberOfCards) {
    const card = (<Col key={count} span={numSpan}><Card loading /></Col>);
    cards.push(card);
    count += 1;
  }
  return (
    <Row gutter={gutter} style={{ marginTop: '4rem', width: '100%' }}>
      {
        cards.map(card => card)
      }
    </Row>
  );
}
LoadingCards.propTypes = {
  numberOfCards: PropTypes.number.isRequired,
  gutter: PropTypes.number.isRequired
};
export default LoadingCards;
