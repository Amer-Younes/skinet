
using API.DTOs;
using API.Extensions;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(IUnitOfWork unit , IPaymentService paymentService) : BaseApiController
    {
        [HttpGet("orders")]
        public async Task<ActionResult<IReadOnlyList<OrderDTO>>> GetOrders([FromQuery] OrderSpecParams specParams)
        {
            var spec = new OrderSpecification(specParams);
            return await CreatePageResult(unit.Repository<Order>(), spec, specParams.PageIndex, specParams.PageSize , o => o.ToDTO());
        }




        [HttpGet("orders/{id:int}")]
        public async Task<ActionResult<OrderDTO>> GetOrderById(int id)
        {
            var spec = new OrderSpecification(id);
            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return BadRequest("Order not found");
            return order.ToDTO();
        }


        [HttpPost("orders/refund/{id:int}")]
    public async Task<ActionResult<OrderDTO>> RefundOrder(int id){
        var spec = new OrderSpecification(id);
        var order = await unit.Repository<Order>().GetEntityWithSpec(spec);
        if (order == null) return BadRequest("Order not found");

        if(order.Status == OrderStatus.Pending)
            {
                return BadRequest("Cannot refund an order that is still pending");
            }
        var result = await paymentService.RefundPayment(order.PaymentIntentId);

        if(result == "succeeded"){
            order.Status = OrderStatus.Refunded;
            unit.Repository<Order>().Update(order);
            if(await unit.Complete()){
                return order.ToDTO();
            }
        }
            return BadRequest("Problem updating order status to refunded");
    }
    }
}
