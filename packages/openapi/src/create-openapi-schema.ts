import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'
import { type Table } from '@undb/core'
import { format } from 'date-fns'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import OpenAPISnippet from 'openapi-snippet'
import type { OpenAPIObject } from 'openapi3-ts/oas30'
import { COMPONENT_RECORD } from './constants'
import { listRecords } from './routes/list-records'
import { createOpenAPIRecordSchema } from './schema/open-api-record.schema'

export const createTableSchema = (table: Table): OpenAPIObject => {
  const registry = new OpenAPIRegistry()

  const recordSchema = createOpenAPIRecordSchema(table)
  registry.register(COMPONENT_RECORD, recordSchema)

  const routes = [listRecords(table, recordSchema)]

  for (const route of routes) {
    registry.registerPath(route)
  }

  function getOpenApiDocumentation() {
    const generator = new OpenApiGeneratorV3(registry.definitions)

    const generated = generator.generateDocument({
      openapi: '3.0.0',
      info: {
        version: format(new Date(), 'yyyy-MM-dd'),
        title: `undb ${table.name.value} open api`,
        description: `This is the open API of undb table ${table.name.value}`,
      },
      servers: [{ url: 'http://localhost:4000/api/v1/openapi' }],
    })

    return generated
  }

  const docs = getOpenApiDocumentation()

  try {
    for (const route of routes) {
      const generated = OpenAPISnippet.getEndpointSnippets(docs, route.path, route.method, [
        'shell_curl',
        'javascript_fetch',
        'javascript_axios',
        'node',
        'go',
      ])
      const path = docs.paths[route.path][route.method]
      if (path) {
        path['x-codeSamples'] = []
        for (const [index, snippet] of generated.snippets.entries()) {
          path['x-codeSamples'][index] = { lang: snippet.title, source: snippet.content }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }

  return docs
}
