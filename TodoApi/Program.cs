using Microsoft.EntityFrameworkCore;
using TodoApi;
var builder = WebApplication.CreateBuilder(args);
var port = Environment.GetEnvironmentVariable("PORT");
if (port != null)
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ToDoDB")));
builder.Services.AddCors(options=>options.AddDefaultPolicy(policy=>policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();
app.MapGet("/items", (ToDoDbContext context) => context.Items.ToList());
app.MapPost("/items", (Item item,ToDoDbContext context) =>{
    Item item1=new Item();
    item1.IsComplete=false;
    item1.Name=item.Name;
    context.Items.Add(item1);
    context.SaveChanges();
    return item1;
    } );
app.MapPut("/items/{id}", (int id, Item item, ToDoDbContext context) =>
{
    var existing = context.Items.Find(id);
    if (existing == null)
        return Results.NotFound();

    existing.IsComplete = item.IsComplete;
    if (item.Name != null)
        existing.Name = item.Name;

    context.SaveChanges();
    return Results.Ok(existing);
});
app.MapDelete("/items/{id}", (int id, ToDoDbContext context) =>
{
    var existing = context.Items.Find(id);
    if (existing == null)
        return Results.NotFound();

    context.Items.Remove(existing);
    context.SaveChanges();
    return Results.NoContent();
});
app.Run();