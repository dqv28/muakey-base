import { getAccounts, getAttendances } from '@/libs/data'
import CheckInFiltered from './components/CheckInFiltered'
import CheckInTable from './components/CheckInTable'

const page: React.FC<any> = async (prop: {
  params: any
  searchParams: any
}) => {
  const searchParams = await prop.searchParams

  const attendances = await getAttendances({
    date: searchParams?.date || '',
  })
  const members = await getAccounts()

  const day = String(searchParams?.date).split('-').pop()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <div className="flex items-center justify-between border-b border-[#f6f6f6] bg-[#fff] p-[16px] text-[24px]">
        <span className="font-[500]">Chấm công</span>
        <CheckInFiltered />
      </div>
      <div className="h-[calc(100vh-72px)] overflow-auto p-[16px]">
        <CheckInTable
          options={{
            attendances,
            members: members?.filter((mem: any) => mem?.type !== 'department'),
            day: Number(day || 0),
          }}
          scroll={{
            x: 'max-content',
          }}
          pagination={false}
          bordered
          rootClassName="!customize-scroll"
        />
      </div>
    </div>
  )
}

export default page
