using Domain.Entitiy;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.Configuration;

public class RequestConfiguration : IEntityTypeConfiguration<Request>
{
    public void Configure(EntityTypeBuilder<Request> builder)
    {
        builder.ToTable("Request");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.Latitude).IsRequired();
        builder.Property(x => x.Longitude).IsRequired();
        builder.Property(x => x.RequestState).IsRequired();
        builder.Property(x => x.CreatedAt).IsRequired();
        
        builder.Property(x=>x.FirstName).HasMaxLength(50).IsRequired();
        builder.Property(x=>x.LastName).HasMaxLength(50).IsRequired();
        
        builder.HasOne(x => x.Result)
            .WithOne(x => x.Request)
            .HasForeignKey<Request>(x => x.ResultId);
        
    }
}