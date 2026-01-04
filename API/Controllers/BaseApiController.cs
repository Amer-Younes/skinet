using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {

        protected async Task<ActionResult> CreatePageResult<T>(IGenericRepository<T> repo,
        ISpecification<T> spec, int pageIndex, int pageSize) where T : BaseEntity
        {
            var items = await repo.ListAsync(spec);
            var count = await repo.CountAsync(spec);

            var pagination = new Pagintion<T>(pageIndex, pageSize, count, items);

            return Ok(pagination);
        }

        protected async Task<ActionResult> CreatePageResult<T , TDto>(IGenericRepository<T> repo,
        ISpecification<T> spec, int pageIndex, int pageSize , Func<T, TDto> toDTO) where T : BaseEntity , IDtoConvertible
        {
            var items = await repo.ListAsync(spec);
            var count = await repo.CountAsync(spec);
            var dtoItems = items.Select(toDTO).ToList();

            var pagination = new Pagintion<TDto>(pageIndex, pageSize, count, dtoItems);

            return Ok(pagination);
        }
    }
}
