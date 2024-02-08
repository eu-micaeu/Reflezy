package handlers

// Importando bibliotecas para a criação da classe e funções do usuário.
import (
	"database/sql"
	"time"

	"github.com/gin-gonic/gin"
)

// Estrutura do usuário.
type Usuario struct {
	ID_Usuario int `json:"id_usuario"`

	Usuario string `json:"usuario"`

	Recorde int `json:"recorde"`

	IP string `json:"ip"`

	CreatedAt time.Time `json:"created_at"`
}

// Função para salvar o record do usuário.
func (u *Usuario) Save(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		var usuario Usuario

		if err := c.BindJSON(&usuario); err != nil {

			c.JSON(400, gin.H{"message": "Erro ao fazer login"})

			return

		}

		row := db.QueryRow("UPDATE usuarios SET recorde = $1 WHERE usuario LIKE $2", usuario.Recorde, usuario.Usuario)

		err := row.Scan(&usuario.Recorde ,&usuario.Usuario)

		if err != nil {

			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})

			return

		}

		c.JSON(200, gin.H{"message": "Pontuação salva com sucesso"})
		
	}

}
