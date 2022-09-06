using Microsoft.AspNetCore.Mvc;
using Rethink.Patient_Api.CQRS;
using Rethink.Patient_Api.CQRS.Queries;
using Rethink.Patient_Api.Domain.Aggregates.Patient;
using System.Collections.Generic;

namespace Rethink_Patient_Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PatientController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IAsyncEnumerable<Patient>))]
        public async Task<IActionResult> ReadAll([FromQuery] GetAllPatientsQuery parameters)
        {
            var result = await _mediator.Dispatch(parameters);
            return Ok(result);

        }
    }
}