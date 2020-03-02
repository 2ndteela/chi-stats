const Hapi = require('@hapi/hapi')
const File = require('@hapi/hapi')
const fs = require('fs')

const handleFileUpload = data => {
    try {
        console.log(data)
    }
    catch(e) {
        console.log(e)
    }
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
             files: {
                 relativeTo: __dirname
             }
        }
    })

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('./home.html')
        }
    })

    server.route({
        path: '/upload',
        method: 'POST',
        options: {
            payload: {
              output: 'stream',
            }
        },
        handler: async (req, h) => {
          const { payload } = req

          return payload
        }
      })

    await server.start()
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
})

init()