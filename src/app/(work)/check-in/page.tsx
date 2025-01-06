import { getAccounts, getAttendances, getMe } from '@/libs/data'
import { getWorkSchedule } from '@/libs/schedule'
import CheckInContent from './components/CheckInContent'
import CheckInHeader from './components/CheckInHeader'

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
    getWorkSchedule({
      date: searchParams?.date || '',
    }),
  ])

  const day = String(searchParams?.date).split('-').pop()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <CheckInHeader
        params={{
          searchParams,
        }}
      />
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
