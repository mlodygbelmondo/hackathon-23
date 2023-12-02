using Domain.Entitiy;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("User");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        builder.Property(x => x.FirstName).HasMaxLength(30)
            .IsRequired();
        builder.Property(x => x.LastName).HasMaxLength(30)
            .IsRequired();
        builder.Property(x => x.Email)
            .HasMaxLength(30)
            .IsRequired();
        builder.Property(x => x.Password)
            .HasMaxLength(250)
            .IsRequired();
    }
}