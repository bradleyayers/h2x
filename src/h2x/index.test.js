import htmlToJsx from './plugins/htmlToJsx'
import JSXAttribute from './jsxNodes/JSXAttribute'
import { transform } from './index'

describe('traverse', () => {
  it('should traverse', () => {
    const code = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
        <title>Dismiss</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
            <g id="Dismiss" stroke="#063855" stroke-width="2">
                <path d="M51,37 L37,51" id="Shape"></path>
                <path d="M51,51 L37,37" id="Shape"></path>
            </g>
        </g>
    </svg>
    `

    const spreadSvgProps = () => ({
      visitor: {
        JSXElement: {
          enter(path) {
            if (path.node.name === 'svg') {
              const props = new JSXAttribute()
              props.name = 'props'
              props.spread = true
              path.node.attributes.push(props)
            }
          },
        },
      },
    })

    console.log(transform(code, { plugins: [htmlToJsx, spreadSvgProps] }))
  })
})
