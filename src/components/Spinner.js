import React from 'react'
import loading from './loading.gif'

const Spinner = () => {
  return (
    <div className='text-center my-3'>
      <img src={loading} alt="Loading..." style={{ width: '2%' }} />
    </div>
  )
}
export default Spinner
