import React from 'react'
import theme from 'prism-react-renderer/themes/vsDark'
import rem from 'polished/lib/helpers/rem'
import styled, {css} from 'styled-components'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const monospace = 'dm, monospace';
const headerFont = `"Avenir Next", ${bodyFont}`;
const sidebarWidth = 300;

const Live: any = styled(LiveProvider).attrs({theme})<any>`
  width: ${rem(1024)};
  max-width: 100%;
  margin: 0 auto;
  padding: ${rem(90)} ${rem(40)} 0 ${rem(40)};
  box-sizing: border-box;
  font-family: ${bodyFont};
  transition: transform 150ms ease-out;
  border-radius: ${rem(10)};
  padding: ${rem(100)} ${rem(20)} ${rem(30)} ${rem(20)};
  transform: translateX(${p => (p.moveRight ? rem(sidebarWidth) : 0)});
  ${_ => _.flex && css`
    display: flex;
    flex-wrap:wrap;
  `}
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
  ${_ => _.height && `height: ${rem(_.height)};`}
  ${_ => _.minHeight && `min-height: ${rem(_.minHeight)};`}
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
  width: 100%;
  margin: ${rem(36)} 0;
`

Live.Card = styled((props: any) => (
  <Live flex noInline {...props}>
    <Live.Container>
      <Live.Editor />
      <Live.Error />
    </Live.Container>
    <Live.Preview/>
  </Live>
))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export {Live}
