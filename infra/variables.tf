variable "subscription_id" {}
variable "tenant_id" {}
variable "location_prod" { default = "australiaeast" }
variable "location_test" { default = "australiaeast" }

variable "rg_prod" { default = "verisys-rg-prod" }
variable "rg_test" { default = "verisys-rg-test" }

variable "app_name" { default = "verisys-app" }
variable "container_port" { default = 8080 }

# existing DB
variable "db_host" {}
variable "db_name" { default = "verisysdb" }
variable "db_username" {}
variable "db_password" { sensitive = true }
