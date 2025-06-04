using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using api.Models;

namespace api.Configurations
{
       public class StockConfiguration : IEntityTypeConfiguration<Stock>
       {
              public void Configure(EntityTypeBuilder<Stock> builder)
              {
                     builder.ToTable("Stocks");

                     builder.HasKey(s => s.Id);

                     builder.Property(s => s.Symbol)
                            .IsRequired()
                            .HasMaxLength(15);

                     builder.Property(s => s.CompanyName)
                            .IsRequired()
                            .HasMaxLength(50);

                     builder.Property(s => s.Industry)
                            .HasMaxLength(100);

                     builder.Property(s => s.Purchase)
                            .HasColumnType("decimal(18,2)");

                     builder.Property(s => s.LastDiv)
                            .HasColumnType("decimal(18,2)");

                     builder.HasMany(s => s.Comments)
                            .WithOne(c => c.Stock)
                            .HasForeignKey(c => c.StockId)
                            .OnDelete(DeleteBehavior.Cascade);
              }
       }
}