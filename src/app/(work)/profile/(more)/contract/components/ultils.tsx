import { Badge } from 'antd'

export const genStatus = (status: string) => {
  switch (status) {
    case 'signed':
      return <Badge status="success" text="Đã ký" />

    case 'not_signed':
      return <Badge status="error" text="Chưa ký" />

    default:
      return 'Không xác định'
  }
}

export const mapAsFile = (files: any[]) => {
  return files.map((file) => file.originFileObj || file)
}
