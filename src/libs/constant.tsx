import {
  CheckListOutlined,
  CodeOutlined,
  OpenOutlined,
  SubScriptOutlined,
  SuperScriptOutlined,
} from '@/ui/icons'
import {
  BoldOutlined,
  CaretDownOutlined,
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  EditOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  SettingOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'

export const EDITOR_ICON_KEYS: any = {
  format_bold: <BoldOutlined />,
  format_italic: <ItalicOutlined />,
  format_underlined: <UnderlineOutlined />,
  code: <CodeOutlined className="text-[20px]" />,
  arrow_drop_down: <CaretDownOutlined />,
  format_list_bulleted: <UnorderedListOutlined className="text-[18px]" />,
  format_list_numbered: <OrderedListOutlined className="text-[18px]" />,
  format_list_checked: <CheckListOutlined className="text-[20px]" />,
  strikeThrough: <StrikethroughOutlined />,
  superscript: <SuperScriptOutlined className="text-[20px]" />,
  subscript: <SubScriptOutlined className="text-[20px]" />,
  link: <LinkOutlined className="text-[18px]" />,
  add_photo: <PictureOutlined className="text-[16px]" />,
  open_in_new: <OpenOutlined className="text-[20px]" />,
  edit: <EditOutlined />,
  content_copy: <CopyOutlined />,
  link_off: <DisconnectOutlined />,
  check: <CheckOutlined className="text-[#42b814]" />,
  delete_small: <DeleteOutlined />,
  settings: <SettingOutlined />,
}

export const GLOBAL_BAN = ['Admin', 'Thảo', 'Nghĩa IT', 'Nhật']

export const START_TIME = '08:30'
export const END_TIME = '17:30'
export const REVALIDATE_TIME = 900
