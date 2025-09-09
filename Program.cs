using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve static files from the current directory
var staticRoot = Directory.GetCurrentDirectory();
var fileProvider = new PhysicalFileProvider(staticRoot);
app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = fileProvider });
app.UseStaticFiles(new StaticFileOptions { FileProvider = fileProvider });

// Bind to port 5500
app.Urls.Clear();
app.Urls.Add("http://localhost:5500");

// Print the actual URL after server starts
app.Lifetime.ApplicationStarted.Register(() =>
{
    var server = app.Services.GetService<IServer>();
    var addressesFeature = server?.Features.Get<IServerAddressesFeature>();
    var addresses = addressesFeature?.Addresses ?? app.Urls;
    Console.WriteLine("\nSite is running at:");
    foreach (var addr in addresses)
    {
        Console.WriteLine("  " + addr);
    }
    Console.WriteLine("\nClick or copy the above URL to open your site in a browser.");
});

Console.WriteLine("Starting static site server on http://localhost:5500 ... Press Ctrl+C to stop.");
app.Run();