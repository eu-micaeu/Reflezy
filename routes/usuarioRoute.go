package routes

import (
	"database/sql"

	"github.com/eu-micaeu/Reflezy/handlers"

	"github.com/gin-gonic/gin"
)

func UsuarioRoutes(r *gin.Engine, db *sql.DB) {

	userHandler := handlers.Usuario{}

	r.PUT("/salvar", userHandler.Save(db))

}
