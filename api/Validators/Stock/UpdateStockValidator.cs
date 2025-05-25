using FluentValidation;
using api.Dtos.Stock;

namespace api.Validators.Stock
{
    public class UpdateStockValidator : AbstractValidator<UpdateStockRequestDto>
    {
        public UpdateStockValidator()
        {
            RuleFor(stock => stock.Symbol)
                    .NotEmpty().WithMessage("Symbol is required.")
                    .MaximumLength(10).WithMessage("Symbol can be at most 10 characters.");

            RuleFor(stock => stock.CompanyName)
                    .NotEmpty().WithMessage("Company name is required.")
                    .MaximumLength(20).WithMessage("Company name can be at most 20 characters.");

            RuleFor(x => x.Purchase)
                    .GreaterThanOrEqualTo(1).WithMessage("Purchase must be at least 1")
                    .LessThanOrEqualTo(1_000_000_000).WithMessage("Purchase must be less than or equal to 1,000,000,000");

            RuleFor(x => x.MarketCap)
                    .GreaterThanOrEqualTo(1).WithMessage("Market Cap must be at least 1")
                    .LessThanOrEqualTo(10_000_000_000_000).WithMessage("Market Cap must be less than or equal to 10,000,000,000,000");
        }
    }
}