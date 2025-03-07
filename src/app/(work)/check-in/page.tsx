import { getAccounts, getAttendances, getMe } from '@/libs/data'
import { getProposes } from '@/libs/propose'
import { getWorkSchedule } from '@/libs/schedule'
import CheckInContent from './components/checkin-content'
import CheckInHeader from './components/CheckInHeader'

const page: React.FC<any> = async (prop: {
  params: any
  searchParams: any
}) => {
  const searchParams = await prop.searchParams

  const form = await searchParams?.form
  const table = await searchParams?.table
  const status = await searchParams?.status

  const [attendances, members, user, workSchedule, propose] = await Promise.all(
    [
      getAttendances({
        date: searchParams?.date || '',
      }),
      getAccounts({
        date: searchParams?.date || '',
      }),
      getMe(),
      getWorkSchedule({
        date: searchParams?.date || '',
      }),
      getProposes({
        date: searchParams?.date || '',
      }),
    ],
  )

  const day = String(searchParams?.date).split('-').pop()

  const hasSearchParams = Object.keys(searchParams).length > 0

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <CheckInHeader
        params={{
          type:
            !searchParams?.date && hasSearchParams
              ? searchParams?.form
                ? 'form-request'
                : searchParams?.table
                  ? 'table-history'
                  : ''
              : 'none',
        }}
        activeKey={form || (table ? 'all' : status)}
      />
      <div className="h-[calc(100vh-72px)] overflow-auto p-[16px]">
        <CheckInContent
          query={{
            type:
              hasSearchParams && !searchParams?.date
                ? searchParams?.form
                  ? 'form-request'
                  : 'table-history'
                : 'none',
            searchParams,
          }}
          options={{
            attendances,
            members,
            day,
            user,
            workSchedule,
            propose,
          }}
        />
      </div>
    </div>
  )
}

export default page
