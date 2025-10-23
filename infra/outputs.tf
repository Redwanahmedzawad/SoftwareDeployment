output "prod_url" {
  value = "https://${azurerm_linux_web_app.prod.default_hostname}"
}

output "staging_url" {
  value = "https://${azurerm_linux_web_app_slot.staging.default_hostname}"
}

output "test_url" {
  value = "https://${azurerm_linux_web_app.test.default_hostname}"
}
