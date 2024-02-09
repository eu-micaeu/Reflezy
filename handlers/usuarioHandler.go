package handlers

import (

	"database/sql"

	"time"

	"github.com/gin-gonic/gin"
)

type Usuario struct {

	ID_Usuario int       `json:"id_usuario"`

	Usuario     string    `json:"usuario"`

	Recorde     int       `json:"recorde"`

	IP          string    `json:"ip"`

	Criado_Em   time.Time `json:"criado_em"`

}

func (u *Usuario) Salvar(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		var novoUsuario Usuario

		if err := c.BindJSON(&novoUsuario); err != nil {

			c.JSON(400, gin.H{"message": "Erro ao criar usuario"})

			return

		}

		_, err := db.Exec("INSERT INTO usuarios (usuario, recorde, ip, criado_em) VALUES ($1, $2, $3, $4)", novoUsuario.Usuario, novoUsuario.Recorde, c.ClientIP(), time.Now())

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao criar usuário"})

			return

		}

		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!"})

	}

}

func (u *Usuario) Recordes(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		rows, err := db.Query("SELECT * FROM usuarios ORDER BY recorde DESC")

		if err != nil {

			c.JSON(500, gin.H{"message": "Erro ao buscar recordes"})

			return

		}

		var usuarios []Usuario

		for rows.Next() {

			var usuario Usuario

			rows.Scan(&usuario.ID_Usuario, &usuario.Usuario, &usuario.Recorde, &usuario.IP, &usuario.Criado_Em)

			usuarios = append(usuarios, usuario)

		}

		c.JSON(200, usuarios)

	}

}