using System.ComponentModel.DataAnnotations;
using System.Net;
using FinancialControl.Api.Models.DTOs;

namespace FinancialControl.Api.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private const string InternalServerErrorMessage = "Internal server error";

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Passa a requisição para o próximo middleware na pipeline
                await _next(context);
            }
            catch (Exception ex)
            {
                // Trata a exceção e retorna uma resposta padronizada
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";

            // Define o status code baseado no tipo da exceção
            int statusCode = ex switch
            {
                KeyNotFoundException => (int)HttpStatusCode.NotFound, // 404
                ValidationException => (int)HttpStatusCode.BadRequest, // 400
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized, // 401
                _ => (int)HttpStatusCode.InternalServerError, // 500
            };

            context.Response.StatusCode = statusCode;

            // Define a mensagem que será retornada
            var response = new ErrorResponse
            {
                Message =
                    statusCode == (int)HttpStatusCode.InternalServerError
                        ? InternalServerErrorMessage
                        : ex.Message,
            };

            // Serializa e escreve a resposta JSON
            return context.Response.WriteAsJsonAsync(response);
        }
    }
}
