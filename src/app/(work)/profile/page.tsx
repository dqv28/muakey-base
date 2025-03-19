import { getMe } from '@/libs/data'
import ProfileContactCard from './components/profile-contact-card'
import ProfileDeductionsCard from './components/profile-deductions-card'
import ProfileEduInfomationCard from './components/profile-edu-infomation-card'
import ProfileInfomationCard from './components/profile-infomation-card'
import ProfileWorkHistoryCard from './components/profile-work-history-card'
import ProfileMoreLayout from './components/ProfileLayout'

const ProfilePage: React.FC = async () => {
  const user = await getMe({
    include: 'profile',
  })

  return (
    <ProfileMoreLayout user={user}>
      <div className="no-scroll h-[calc(100vh-87px)] !space-y-[16px] overflow-y-auto">
        <ProfileInfomationCard title="Thông tin cá nhân" user={user} />

        <ProfileDeductionsCard title="Thuế và bảo hiểm" user={user} />

        <ProfileEduInfomationCard
          title="Thông tin học vấn"
          items={user?.educations}
          options={{
            userId: user?.id,
          }}
        />

        <ProfileWorkHistoryCard
          title="Lịch sử làm việc"
          items={user?.work_histories}
          options={{
            userId: user?.id,
          }}
        />

        <ProfileContactCard
          title="Gia đình, người phụ thuộc và người liên hệ khác"
          items={user?.family_members}
          options={{
            userId: user?.id,
          }}
        />
      </div>
    </ProfileMoreLayout>
  )
}

export default ProfilePage
