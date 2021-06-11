const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const getJSONResponse = (body: any, code: number) => {
    return {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin' : '*',
            'Content-Type'                : 'application/json; charset=utf-8',
        },
        statusCode: code,
        body: isJson(body) ? body : JSON.stringify(body)
    };
};

const httpOk = (body: any) => getJSONResponse(body, 200);

const httpBadRequest = (errorDetails: any) => getJSONResponse({errorDetails}, 400);

export {httpOk, httpBadRequest};