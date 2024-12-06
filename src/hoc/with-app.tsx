import { App } from 'antd'
import { ComponentType } from 'react'

export type WithAppType = <P>(Component: ComponentType<P>) => React.FC<P>

const withApp: WithAppType = (Component) => {
  const ComponentWithApp: React.FC<any> = (componentProps) => (
    <App>
      <Component {...componentProps} />
    </App>
  )

  return ComponentWithApp
}

export default withApp
