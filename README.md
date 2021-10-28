# GB Tools Auth Service
Exposed api service for access to cognito user pool.
In order to use it with the other custom pools just add values to .env like described in .env.example add a copy of serverless.yml with another service name in order to deploy it.

## Endpoints
Method | Url | Payload
------ | --- | -------
POST | /login | {"username": "","password": ""}
POST | /password/forgot | {"username": ""}
POST | /password/reset | {"username": "","verificationCode": "","newPassword": ""}


## Current production implementation
Current production implementation is linked to `SlothToolPool` cognito user pool and
is accessible through the following url
`https://nflmjjcghl.execute-api.eu-central-1.amazonaws.com/prod`