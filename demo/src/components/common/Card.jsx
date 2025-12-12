import React from 'react';
import './Card.css';

const Card = ({
  children,
  title,
  className = '',
  shadow = true,
  padding = true
}) => {
  return (
    <div className={`card ${shadow ? 'card-shadow' : ''} ${className}`}>
      {title && <div className="card-header">{title}</div>}

      <div className={`card-body ${padding ? 'card-padding' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;