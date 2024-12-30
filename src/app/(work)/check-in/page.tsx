import { getAccounts, getAttendances, getMe } from '@/libs/data'
import { getWorkSchedule } from '@/libs/schedule'
import CheckInContent from './components/CheckInContent'
import CheckInFiltered from './components/CheckInFiltered'

const page: React.FC<any> = async (prop: {
  params: any
  searchParams: any
}) => {
  const searchParams = await prop.searchParams

  const [attendances, members, user, workSchedule] = await Promise.all([
    getAttendances({
      date: searchParams?.date || '',
    }),
    getAccounts(),
    getMe(),
    getWorkSchedule(),
  ])

  const day = String(searchParams?.date).split('-').pop()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <div className="flex items-center justify-between border-b border-[#f6f6f6] bg-[#fff] p-[16px] text-[24px]">
        <span className="font-[500]">Chấm công</span>
        <CheckInFiltered />
      </div>
      <div className="h-[calc(100vh-72px)] overflow-auto p-[16px]">
        <CheckInContent
          hasForm={!!searchParams?.form}
          options={{
            attendances,
            members,
            day,
            user,
            workSchedule,
          }}
        />
      </div>
    </div>
  )
}

export default page
