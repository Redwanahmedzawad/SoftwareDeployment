# --- web build ---
FROM node:20 AS webbuild
WORKDIR /web
COPY web/verisys-web/ ./
RUN npm ci && npm run build

# --- api build ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS apibuild
WORKDIR /src
COPY api/Verisys.Api/ ./Verisys.Api/
COPY --from=webbuild /web/dist ./Verisys.Api/wwwroot
RUN dotnet publish Verisys.Api/Verisys.Api.csproj -c Release -o /app

# --- runtime ---
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=apibuild /app ./
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet","Verisys.Api.dll"]
