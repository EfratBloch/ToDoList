# Build stage: restore and publish the API with the .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY TodoApi.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

# Run stage: only the ASP.NET runtime and the published files
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "TodoApi.dll"]
