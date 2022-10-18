import "@fontsource/nunito/500.css"

import React from "react"

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return <div className="font-primary">{children}</div>
}

export default Layout
