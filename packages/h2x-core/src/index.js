/* eslint-disable no-restricted-syntax */
import parse from 'h2x-parse'
import generate from 'h2x-generate'
import traverse from 'h2x-traverse'

const reduceVisitors = (visitors, opts) => {
  Object.entries(visitors).forEach(([key, visitor]) => {
    if (typeof visitor === 'function') {
      opts[key] = opts[key] || []
      opts[key].push(visitor)
    } else {
      opts[key] = opts[key] || {}
      reduceVisitors(visitor, opts[key])
    }
    return opts
  })
}

const mergePlugins = plugins =>
  plugins.reduce(
    (opts, plugin) => {
      const { visitor = {}, generator = {} } = plugin()
      reduceVisitors(visitor, opts.visitor)
      reduceVisitors(generator, opts.generator)
      return opts
    },
    { visitor: {}, generator: {} },
  )

export { traverse, generate }

export function transform(code, { plugins = [] } = {}) {
  const ast = parse(code)
  const { visitor, generator } = mergePlugins(plugins)
  traverse(ast, visitor)
  return generate(ast, generator)
}
