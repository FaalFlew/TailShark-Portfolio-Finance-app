using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Models;

namespace api.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comments");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Title)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(c => c.Content)
                   .IsRequired()
                   .HasMaxLength(2000);

            builder.Property(c => c.CreatedOn)
                   .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}