import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API Documentation",
            version: "1.0.0",
            description: "API documentation for the Blog application",
        },
        servers: [
            {
                url: "http://localhost",
                description: "Development server",
            },
            {
                url: "",
                description: "Production server",
            },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                    },
                },
            },
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
    apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
