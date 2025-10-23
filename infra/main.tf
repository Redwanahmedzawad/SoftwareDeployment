# Resource groups
resource "azurerm_resource_group" "prod" {
  name     = var.rg_prod
  location = var.location_prod
}
resource "azurerm_resource_group" "test" {
  name     = var.rg_test
  location = var.location_test
}

# Plans
resource "azurerm_service_plan" "plan_prod" {
  name                = "${var.app_name}-plan"
  resource_group_name = azurerm_resource_group.prod.name
  location            = azurerm_resource_group.prod.location
  os_type             = "Linux"
  sku_name            = "S1"
}
resource "azurerm_service_plan" "plan_test" {
  name                = "${var.app_name}-plan-test"
  resource_group_name = azurerm_resource_group.test.name
  location            = var.location_test
  os_type             = "Linux"
  sku_name            = "B1"
}

# PROD app (no container specified; CI will configure)
resource "azurerm_linux_web_app" "prod" {
  name                = var.app_name
  resource_group_name = azurerm_resource_group.prod.name
  location            = azurerm_resource_group.prod.location
  service_plan_id     = azurerm_service_plan.plan_prod.id

  identity { type = "SystemAssigned" }

  site_config { always_on = true }

  app_settings = {
    WEBSITES_PORT              = tostring(var.container_port)
    ConnectionStrings__Default = "Host=${var.db_host};Database=${var.db_name};Username=${var.db_username};Password=${var.db_password};Ssl Mode=Require"
  }
}

# Staging slot for blue/green
resource "azurerm_linux_web_app_slot" "staging" {
  name           = "staging"
  app_service_id = azurerm_linux_web_app.prod.id # ← change this line

  site_config {
    always_on = true
  }

  app_settings = azurerm_linux_web_app.prod.app_settings
}


# TEST app
resource "azurerm_linux_web_app" "test" {
  name                = "${var.app_name}-test"
  resource_group_name = azurerm_resource_group.test.name
  location            = azurerm_resource_group.test.location
  service_plan_id     = azurerm_service_plan.plan_test.id

  identity { type = "SystemAssigned" }

  site_config { always_on = true }

  app_settings = {
    WEBSITES_PORT              = tostring(var.container_port)
    ConnectionStrings__Default = "Host=${var.db_host};Database=${var.db_name};Username=${var.db_username};Password=${var.db_password};Ssl Mode=Require"
  }
}
