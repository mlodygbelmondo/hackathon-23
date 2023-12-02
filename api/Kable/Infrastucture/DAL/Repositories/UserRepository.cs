using Domain.Entitiy;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.DAL.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }
    
    public async Task<ICollection<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _context.Users.SingleOrDefaultAsync(x=>x.Email== email);
    }

    public async Task<User> GetUserByIdAsync(int? id)
    {
        return await _context.Users.SingleOrDefaultAsync(x=>x.Id== id);
    }

    public async Task<User> AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }
}