package routes

import (
	"database/sql"

	"github.com/eu-micaeu/Reflezy/handlers"

	"github.com/gin-gonic/gin"
)

func UsuarioRoutes(r *gin.Engine, db *sql.DB) {

	userHandler := handlers.Usuario{}

	r.POST("/salvar", userHandler.Salvar(db))

	r.GET("/recordes", userHandler.Recordes(db))

}
