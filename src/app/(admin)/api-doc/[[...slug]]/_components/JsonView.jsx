import React from 'react';
import ReactJsonViewCompare from 'react-json-view-compare';

export function JsonView({ oldData = null, newData }) {
    return (
        <ReactJsonViewCompare oldData={oldData || newData} newData={newData} />
    );
}