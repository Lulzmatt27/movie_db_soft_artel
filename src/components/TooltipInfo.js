import React from 'react'
import { Badge } from 'react-bootstrap'
const TooltipInfo = ({ label, data }) => {
  return (
    <>
      <strong className='mx-2'>{label}:</strong>
      <Badge pill variant='secondary'>
        {data}
      </Badge>
    </>
  )
}

export default TooltipInfo
