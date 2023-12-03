using System.Text;
using Application;
using Application.Settings;
using Infrastucture;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var authenicationSettings = new AuthenticationSettings();

builder.Configuration.GetSection("Authentication").Bind(authenicationSettings);
builder.Services.AddAuthentication(option =>
{
    option.DefaultScheme = "Bearer";
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidIssuer = authenicationSettings.JwtIssuer,
        ValidAudience = authenicationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenicationSettings.JwtKey))
    };
});


builder.Services.AddCors(opt=>opt.AddPolicy("CorsPolicy",
    policy => { policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(new String[]{"http://127.0.0.1:3000", "http://localhost:3000" });
}));

builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.MapControllers();
app.UseHttpsRedirection();
app.Run();  
