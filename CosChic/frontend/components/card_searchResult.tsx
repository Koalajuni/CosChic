import React from 'react';

const CardSearchResult = ({ image, title, description }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <img
                src={image}
                alt={title}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '20px' }}
            />
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CardSearchResult;
