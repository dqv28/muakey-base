import { BellFilled } from '@ant-design/icons'
import { times } from 'lodash'
import React from 'react'

export type SubSideProps = {}

const SubSide: React.FC = () => {
  return (
    <div className="w-[60px]">
      {times(3, () => (
        <div className="flex size-[60px] items-center justify-center">
          <BellFilled className="text-[16px]" />
        </div>
      ))}
    </div>
  )
}

export default SubSide
