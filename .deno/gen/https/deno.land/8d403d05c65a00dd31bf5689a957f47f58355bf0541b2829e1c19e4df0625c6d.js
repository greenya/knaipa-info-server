import { Status } from "./vendor/https/deno.land/std/http/http_status.ts";
export function createHttpExceptionBody(msgOrBody, error, statusCode) {
    if (typeof msgOrBody === "object" && !Array.isArray(msgOrBody)) {
        return msgOrBody;
    }
    else if (typeof msgOrBody === "string") {
        return { statusCode, error, message: msgOrBody };
    }
    return { statusCode, error };
}
export class HttpException extends Error {
    constructor(response, status) {
        super();
        this.response = response;
        this.status = status;
        this.message = response;
    }
}
export class BadGatewayException extends HttpException {
    constructor(message, error = "Bad Gateway") {
        super(createHttpExceptionBody(message, error, Status.BadGateway), Status.BadGateway);
    }
}
export class BadRequestException extends HttpException {
    constructor(message, error = "Bad Request") {
        super(createHttpExceptionBody(message, error, Status.BadRequest), Status.BadRequest);
    }
}
export class ConflictException extends HttpException {
    constructor(message, error = "Conflict") {
        super(createHttpExceptionBody(message, error, Status.Conflict), Status.Conflict);
    }
}
export class ForbiddenException extends HttpException {
    constructor(message, error = "Forbidden") {
        super(createHttpExceptionBody(message, error, Status.Forbidden), Status.Forbidden);
    }
}
export class GatewayTimeoutException extends HttpException {
    constructor(message, error = "Gateway Timeout") {
        super(createHttpExceptionBody(message, error, Status.GatewayTimeout), Status.GatewayTimeout);
    }
}
export class GoneException extends HttpException {
    constructor(message, error = "Gone") {
        super(createHttpExceptionBody(message, error, Status.Gone), Status.Gone);
    }
}
export class TeapotException extends HttpException {
    constructor(message, error = "Teapot") {
        super(createHttpExceptionBody(message, error, Status.Teapot), Status.Teapot);
    }
}
export class MethodNotAllowedException extends HttpException {
    constructor(message, error = "Method Not Allowed") {
        super(createHttpExceptionBody(message, error, Status.MethodNotAllowed), Status.MethodNotAllowed);
    }
}
export class NotAcceptableException extends HttpException {
    constructor(message, error = "Not Acceptable") {
        super(createHttpExceptionBody(message, error, Status.NotAcceptable), Status.NotAcceptable);
    }
}
export class NotFoundException extends HttpException {
    constructor(message, error = "Not Found") {
        super(createHttpExceptionBody(message, error, Status.NotFound), Status.NotFound);
    }
}
export class NotImplementedException extends HttpException {
    constructor(message, error = "Not Implemented") {
        super(createHttpExceptionBody(message, error, Status.NotImplemented), Status.NotImplemented);
    }
}
export class RequestEntityTooLargeException extends HttpException {
    constructor(message, error = "Request Entity Too Large") {
        super(createHttpExceptionBody(message, error, Status.RequestEntityTooLarge), Status.RequestEntityTooLarge);
    }
}
export class RequestTimeoutException extends HttpException {
    constructor(message, error = "Request Timeout") {
        super(createHttpExceptionBody(message, error, Status.RequestTimeout), Status.RequestTimeout);
    }
}
export class ServiceUnavailableException extends HttpException {
    constructor(message, error = "Service Unavailable") {
        super(createHttpExceptionBody(message, error, Status.ServiceUnavailable), Status.ServiceUnavailable);
    }
}
export class UnauthorizedException extends HttpException {
    constructor(message, error = "Unauthorized") {
        super(createHttpExceptionBody(message, error, Status.Unauthorized), Status.Unauthorized);
    }
}
export class UnprocessableEntityException extends HttpException {
    constructor(message, error = "Unprocessable Entity") {
        super(createHttpExceptionBody(message, error, Status.UnprocessableEntity), Status.UnprocessableEntity);
    }
}
export class InternalServerErrorException extends HttpException {
    constructor(message, error = "Internal Server Error") {
        super(createHttpExceptionBody(message, error, Status.InternalServerError), Status.InternalServerError);
    }
}
export class UnsupportedMediaTypeException extends HttpException {
    constructor(message, error = "Unsupported Media Type") {
        super(createHttpExceptionBody(message, error, Status.UnsupportedMediaType), Status.UnsupportedMediaType);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwX2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFnQjFFLE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsU0FBcUIsRUFDckIsS0FBYyxFQUNkLFVBQW1CO0lBRW5CLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM5RCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtTQUFNLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztLQUNsRDtJQUNELE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDL0IsQ0FBQztBQUVELE1BQU0sT0FBTyxhQUFjLFNBQVEsS0FBSztJQUV0QyxZQUNXLFFBQXNDLEVBQ3RDLE1BQWM7UUFFdkIsS0FBSyxFQUFFLENBQUM7UUFIQyxhQUFRLEdBQVIsUUFBUSxDQUE4QjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBR3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxhQUFhO0lBQ3BELFlBQ0UsT0FBNEMsRUFDNUMsS0FBSyxHQUFHLGFBQWE7UUFFckIsS0FBSyxDQUNILHVCQUF1QixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUMxRCxNQUFNLENBQUMsVUFBVSxDQUNsQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFDcEQsWUFDRSxPQUE0QyxFQUM1QyxLQUFLLEdBQUcs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