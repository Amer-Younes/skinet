using System;
using API.DTOs;
using Core.Entities.OrderAggregate;

namespace API.Extensions;

public static class OrderMappingExtensions
{
    public static OrderDTO ToDTO(this Order order)
    {
        return new OrderDTO
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            BuyerEmail = order.BuyerEmail,
            ShippingAddress = order.ShippingAddress,
            DeliveryMethod = order.DeliveryMethod.Description,
            PaymentSummary = order.PaymentSummary,
            ShippingPrice = order.DeliveryMethod.Price,
            OrderItems = order.OrderItems.Select(x => x.ToDTO()).ToList(),
            Subtotal = order.Subtotal,
            Status = order.Status.ToString(),
            Total = order.GetTotal(),
            PaymentIntentId = order.PaymentIntentId
        };
    }

    public static OrderItemDTO ToDTO(this OrderItem item)
    {
        return new OrderItemDTO
        {
            ProductId = item.ItemOrdered.ProductId,
            ProductName = item.ItemOrdered.ProductName,
            PictureUrl = item.ItemOrdered.PictureUrl,
            Price = item.Price,
            Quantity = item.Quantity
        };
    }
}
