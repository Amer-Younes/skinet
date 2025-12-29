using API.DTOs;
using API.Extensions;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(ICartService cartService , IUnitOfWork unit) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var email = User.GetEmail();
            var cart = await cartService.GetCartAsync(orderDTO.CartId);

            if (cart == null) return BadRequest("Cart not found");
            if (cart.PaymentIntentId == null) return BadRequest("PaymentIntentId is null");

            var items = new List<OrderItem>();
            foreach (var item in cart.Items)
            {
                var productItem = await unit.Repository<Core.Entities.Product>().GetByIdAsync(item.ProductId);
                if (productItem == null) return BadRequest($"Product with id {item.ProductId} not found");

                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = item.ProductId,
                    ProductName = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
            }
            var deliveryMethod = await unit.Repository<DeliveryMethod>().GetByIdAsync(orderDTO.DeliveryMethodId);
            if (deliveryMethod == null) return BadRequest("Delivery method not found");
            var order = new Order
            {
                OrderItems = items,
                DeliveryMethod = deliveryMethod,
                ShippingAddress = orderDTO.ShippingAddress,
                Subtotal = items.Sum(item => item.Price * item.Quantity),
                PaymentSummary = orderDTO.PaymentSummary,
                PaymentIntentId = cart.PaymentIntentId,
                BuyerEmail = email
            };
            unit.Repository<Order>().Add(order);
            if (await unit.Complete()) {
                return order;
            }
            return BadRequest("Problem creating order");

        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDTO>>> GetOrdersForUser()
        {
            var spec = new OrderSpecification(User.GetEmail());
            var orders = await unit.Repository<Order>().ListAsync(spec);
            var ordersToReturn = orders.Select(order => order.ToDTO()).ToList();
            return Ok(ordersToReturn);
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDTO>> GetOrderById(int id)
        {
            var spec = new OrderSpecification(User.GetEmail(), id);
            var order = await unit.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return NotFound();
            return Ok(order.ToDTO());
        }
    }
}
