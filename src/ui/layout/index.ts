import Header from "./Header";
import Layout from "./Layout";
import Main from "./Main";
import Side from "./Side";

type CompoundedLayoutProps = typeof Layout & {
  Header: typeof Header
  Side: typeof Side
  Main: typeof Main
}

const CompoundedLayout = Layout as CompoundedLayoutProps

CompoundedLayout.Header = Header
CompoundedLayout.Side = Side
CompoundedLayout.Main = Main

export type { LayoutProps } from './Layout'
export type { SideProps } from './Side'
export type { HeaderProps } from './Header'
export type { MainProps } from './Main'
export { CompoundedLayout as Layout }
export default CompoundedLayout