import { autoBatchEnhancer } from '@reduxjs/toolkit'
import React from 'react'
import { Spinner } from 'react-bootstrap'


function Loader() {
    return (
        <Spinner animation='border' role='status' className='loader'>
            <span className='sr-only'></span>
        </Spinner>
    )
}

export default Loader
