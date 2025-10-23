FROM node:20 AS webbuild
WORKDIR /web
COPY web/verisys-web/ ./
RUN npm ci && npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS apibuild
WORKDIR /src
COPY . .
RUN dotnet restore "verisys.sln"
COPY --from=webbuild /web/dist ./api/Verisys.Api/wwwroot
RUN dotnet publish "api/Verisys.Api/Verisys.Api.csproj" -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=apibuild /app .
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Verisys.Api.dll"]
