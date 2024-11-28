import { getAccount, getAttendances } from '@/libs/data'
import CheckInFiltered from './components/CheckInFiltered'
import CheckInTable from './components/CheckInTable'

const page: React.FC = async () => {
  const attendances = await getAttendances()
  const members = await getAccount()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <div className="flex items-center justify-between border-b border-[#f6f6f6] bg-[#fff] p-[16px] text-[24px]">
        <span className="font-[500]">Chấm công</span>
        <CheckInFiltered />
      </div>
      <div className="p-[16px]">
        <CheckInTable
          options={{
            attendances,
            members,
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
