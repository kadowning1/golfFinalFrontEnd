import React from 'react'

export default function Deadline() {

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div>
            {(new Date()).toLocaleDateString('en-US', DATE_OPTIONS)}
        </div>
    )
}
