using FluentValidation;
using api.Dtos.Comment;

namespace api.Validators.Comment
{
    public class UpdateCommentValidator : AbstractValidator<UpdateCommentRequestDto>
    {
        public UpdateCommentValidator()
        {
            RuleFor(comment => comment.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MinimumLength(5).WithMessage("Title has to be at least 5 characters.")
                .MaximumLength(60).WithMessage("Title can be at most 60 characters.");

            RuleFor(comment => comment.Content)
                .NotEmpty().WithMessage("Message is required.")
                .MinimumLength(5).WithMessage("Message has to be at least 5 characters.")
                .MaximumLength(280).WithMessage("Message can be at most 280 characters.");
        }
    }
}