package routes

import (
	
	"database/sql"

	"github.com/eu-micaeu/Vocatito/handlers"

	"github.com/gin-gonic/gin"
)

func UsuarioRoutes(r *gin.Engine, db *sql.DB) {

	userHandler := handlers.Usuario{}

	r.POST("/validar-token", userHandler.ValidarToken(db))

	r.POST("/entrar", userHandler.Entrar(db))

	r.GET("/sair", userHandler.Sair)

	r.POST("/cadastrar", userHandler.Registrar(db))

}
