using Microsoft.AspNetCore.Mvc;
using Rethink.Patient_Api.CQRS;
using Rethink.Patient_Api.CQRS.Commands;
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Patient>))]
        public async Task<IActionResult> Read([FromQuery] GetPatientsQuery parameters)
        {
            var result = await _mediator.Dispatch(parameters);
            return Ok(result);

        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Patient))]
        public async Task<IActionResult> Create([FromBody] CreatePatientCommand parameters)
        {
            var result = await _mediator.Dispatch(parameters);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] string id)
        {
            //var result = await _mediator.Dispatch(parameters);
            //return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] )

    }
}