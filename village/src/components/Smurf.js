import React from 'react';

const Smurf = props => {
    return (
        <div className="Smurf">
            <h3>{props.name}</h3>
            <strong>{props.height} tall</strong>
            <p>{props.age} smurf years old</p>
            <button onClick={() => props.deleteSmurf(props.id)}>Delete</button>

            {/* <button onClick={() => props.deleteFriend(props.friend.id)}>Delete</button> */}
        </div>
    );
};

Smurf.defaultProps = {
    name: '',
    height: '',
    age: ''
};

export default Smurf;

