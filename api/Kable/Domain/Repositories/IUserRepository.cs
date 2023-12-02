using Domain.Entitiy;

namespace Domain.Repositories;

public interface IUserRepository
{
    Task<ICollection<User>> GetUsersAsync();
    Task<User> GetUserByEmailAsync(string email);
    Task<User> GetUserByIdAsync(int? id);
    Task<User> AddUserAsync(User user);
    
}