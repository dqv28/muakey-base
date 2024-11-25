import React from 'react'

type JobReviewProps = {
  task?: any
}

const JobReview: React.FC<JobReviewProps> = ({ task }) => {
  return (
    <div className="mt-[16px] space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px]">
      <iframe src={task?.link_youtube} />
      <div>
        <span>Đánh giá: </span> Ngon
      </div>
      <div>
        <span>Hiệu quả: </span> 4 sao
      </div>
    </div>
  )
}

export default JobReview
