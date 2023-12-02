using Domain.Entitiy;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.Configuration;

public class ResultConfiguration : IEntityTypeConfiguration<Result>
{
    public void Configure(EntityTypeBuilder<Result> builder)
    {
        builder.ToTable("Result");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.CableType).IsRequired();
        builder.Property(x => x.CableStrands).IsRequired();
        builder.Property(x => x.Charge).IsRequired();
        builder.Property(x => x.InstallationMethod).IsRequired();
        builder.Property(x => x.EnvironmentalConditions).IsRequired();
        builder.Property(x => x.Link).HasMaxLength(250).IsRequired();
    }
}