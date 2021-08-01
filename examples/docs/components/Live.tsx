import React from 'react'
import theme from 'prism-react-renderer/themes/vsDark'
import rem from 'polished/lib/helpers/rem'
import styled from 'styled-components'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const monospace = 'dm, monospace';
const headerFont = `"Avenir Next", ${bodyFont}`;
const sidebarWidth = 300;

export function Live (props: any) {
    const {children, noInline, ...scope} = props
    const code = React.useMemo(() => {
        return children.toString().trim()
    }, [children])
    return (
      <Live.Provider {...{code, noInline, scope}}>
        <Live.Container>
          <Live.Editor/>
          <Live.Error/>
        </Live.Container>
        <Live.Preview/>
      </Live.Provider>
    )
}

Live.Provider = styled(LiveProvider).attrs({theme})<any>`
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: ${bodyFont};
  transition: transform 150ms ease-out;
  border-radius: ${rem(10)};
  transform: translateX(${p => (p.moveRight ? rem(sidebarWidth) : 0)});
  display: flex;
`

Live.Error = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${'#ff5555'};
  color: white;
  font-size: 0.8rem;
  font-family: ${headerFont};
  white-space: pre;
`

Live.Editor = styled(LiveEditor)<any>`
  font-size: 0.8rem;
  font-family: ${monospace};
  font-weight: 300;
  overflow-y: auto !important;
  overflow-x: hidden;
  white-space: pre-wrap;
  position: relative;
  border-radius: ${rem(10)};
  white-space: pre;
  cursor: text;
  width: 100%;
`

Live.Container = styled.div`
  width: 100%;
  text-align: left;
  display: inline-block;
  margin: ${rem(35)} 0;
  border-radius: ${rem(10)};
`

Live.Preview = styled(LivePreview)`
  border-radius: ${rem(10)};
  width: 100%;
  height: 600px;
`
