import InterviewCard from '@/components/InterviewCards'
import { dummyInterviews } from '@/constants'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      Copy krlena baad me ????
      <div className="w-full flex flex-col gap-6 mt-8">
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview}/>)
        )}
      </div>
    </div>
  )}

export default HomePage
