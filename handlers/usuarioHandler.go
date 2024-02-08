package handlers

// Importando bibliotecas para a criação da classe e funções do usuário.
import (

	"time"
)

// Estrutura do usuário.
type Usuario struct {
	ID_Usuario int `json:"id_usuario"`

	Usuario string `json:"usuario"`

	Senha string `json:"senha"`

	Email string `json:"email"`

	IP string `json:"ip"`

	Criado_Em time.Time `json:"criado_em"`
}
