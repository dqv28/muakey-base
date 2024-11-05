import React from 'react'

type JobDescriptionProps = {
  value?: any
}

const JobDescription: React.FC<JobDescriptionProps> = ({ value }) => {
  return (
    <div className="mt-[24px]">
      <div className="text-[12px] font-[500] text-[#42b814]">MÔ TẢ</div>
      <div
        className="mt-[8px] text-[#999]"
        dangerouslySetInnerHTML={{ __html: value || 'Không có mô tả' }}
      />
    </div>
  )
}

export default JobDescription
