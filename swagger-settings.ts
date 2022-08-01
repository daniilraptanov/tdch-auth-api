const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'TDCH-MAIN-API',
        version: 1,
        description: 'Description of public API',
    },
    basePath: '/',
};

export const swaggerOptions = {
    swaggerDefinition,
    apis: [
        './dist/routes/*.js',
    ],
};