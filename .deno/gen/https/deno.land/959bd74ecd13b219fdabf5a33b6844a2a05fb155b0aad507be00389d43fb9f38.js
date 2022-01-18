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
    response;
    status;
    message;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwX2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFnQjFFLE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsU0FBcUIsRUFDckIsS0FBYyxFQUNkLFVBQW1CO0lBRW5CLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM5RCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtTQUFNLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztLQUNsRDtJQUNELE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDL0IsQ0FBQztBQUVELE1BQU0sT0FBTyxhQUFjLFNBQVEsS0FBSztJQUczQjtJQUNBO0lBSEYsT0FBTyxDQUFNO0lBQ3RCLFlBQ1csUUFBc0MsRUFDdEMsTUFBYztRQUV2QixLQUFLLEVBQUUsQ0FBQztRQUhDLGFBQVEsR0FBUixRQUFRLENBQThCO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFHdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFDcEQsWUFDRSxPQUE0QyxFQUM1QyxLQUFLLEdBQUcsYUFBYTtRQUVyQixLQUFLLENBQ0gsdUJBQXVCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQzFELE1BQU0sQ0FBQyxVQUFVLENBQ2xCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsYUFBYTtJQUNwRCxZ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