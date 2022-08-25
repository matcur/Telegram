using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Telegram.Server.Core.Attributes.Model
{
    public class ModelValidation : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context) { }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var model = context.ModelState;
            if (model.IsValid)
            {
                return;
            }
            
            var errors = model.Root.Errors;
            var errorMessage = errors.Aggregate(
                "",
                (current, error) => current + error.ErrorMessage
            );
            context.Result = new BadRequestObjectResult(errorMessage);
        }
    }
}