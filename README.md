# GB Tools Auth Service

Exposed api service for access to cognito user pool.

##Endpoints
Method | Url | Payload
------ | --- | -------
POST | /login | {"username": "","password": ""}
POST | /password/forgot | {"username": ""}
POST | /password/reset | {"username": "","verificationCode": "","newPassword": ""}

##Current production implementation
Current production implementation is linked to `SlothToolPool` cognito user pool and
is accessible through the following url
`https://e6v2lr5o7h.execute-api.eu-central-1.amazonaws.com/prod`